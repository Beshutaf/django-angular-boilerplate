from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def serialize(self):
        return " ".join(filter(None, (self.user.first_name, self.user.last_name)))


class Role(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Money(models.Model):
    unit = models.IntegerField(null=False)
    amount = models.IntegerField(null=False)

    def serialize(self):
        return self.unit, self.amount


class Product(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Cache(models.Model):
    money_at_shift_start = models.ManyToManyField(Money, related_name="shift_start")
    money_at_shift_end = models.ManyToManyField(Money, related_name="shift_end")
    money_from_shares = models.IntegerField(default=0)
    money_from_cheques = models.IntegerField(default=0)
    money_from_cash = models.IntegerField(default=0)
    envelope_number = models.IntegerField(default=0)

    def serialize(self):
        return dict(money_at_shift_start=dict(m.serialize() for m in self.money_at_shift_start.all()),
                    money_at_shift_end=dict(m.serialize() for m in self.money_at_shift_end.all()),
                    money_from_shares=self.money_from_shares,
                    money_from_cheques=self.money_from_cheques,
                    money_from_cash=self.money_from_cash,
                    envelope_number=self.envelope_number,
                    )

    def update(self, money_at_shift_start=None, money_at_shift_end=None,
               money_from_shares=None, money_from_cheques=None,
               money_from_cash=None, envelope_number=None, **kwargs):
        self.money_at_shift_start = [Money(int(u), a) for u, a in money_at_shift_start.items()]
        self.money_at_shift_end = [Money(int(u), a) for u, a in money_at_shift_end.items()]
        self.money_from_shares = money_from_shares
        self.money_from_cheques = money_from_cheques
        self.money_from_cash = money_from_cash
        self.envelope_number = envelope_number
        self.save()


class Shift(models.Model):
    date = models.DateField(unique=True, db_index=True, primary_key=True)
    members = models.ManyToManyField(Member, through="MemberShift")
    new_members = models.ManyToManyField(Member, related_name="new")
    leaving_members = models.ManyToManyField(Member, related_name="leaving")
    missing_products = models.ManyToManyField(Product, related_name="almost_missing")
    cache = models.ForeignKey(Cache, on_delete=models.CASCADE)

    def serialize(self):
        return dict(date=self.date,
                    member_shifts=[m.serialize() for m in self.membershift_set.all()],
                    new_members=[m.serialize() for m in self.new_members.all()],
                    leaving_members=[m.serialize() for m in self.leaving_members.all()],
                    conclusions=[c.serialize() for c in self.conclusions_set.all()],
                    tasks=[c.serialize() for c in self.tasks_set.all()],
                    missing_products=[p.serialize() for p in self.missing_products.all()],
                    cache=cache.serialize(),
                    )

    def update(self, date=None, members=None, new_members=None, leaving_members=None, conclusions=None, tasks=None,
               missing_products=None, cache=None, **kwargs):
        if date is not None:
            self.date = date
        if members is not None:
            members_in_shift = []
            for m in members:
                member = self.get_or_create_member(m["member"])
                member_shift, _ = MemberShift.objects.get_or_create(shift=self, member=member)
                member_shift.role, _ = Role.objects.get_or_create(m["role"])
                member_shift.shift_number = m["shift_number"]
                member_shift.save()
                members_in_shift.append(member)
            MemberShift.objects.filter(shift=self, member__not_in=members_in_shift).delete()
        if new_members is not None:
            self.new_members = [self.get_or_create_member(m) for m in new_members]
        if leaving_members is not None:
            self.leaving_members = [self.get_or_create_member(m) for m in leaving_members]
        if conclusions is not None:
            conclusions_iter = iter(self.conclusions_set.all())
            for d in conclusions:
                try:
                    c = next(conclusions_iter)
                except StopIteration:
                    c = Conclusions.objects.create(shift=self)
                c.comment = d["comment"]
                c.assigned_team = d["assigned_team"]
                c.done = d["done"]
            for c in conclusions_iter:
                c.delete()
        if tasks is not None:
            tasks_iter = iter(self.tasks_set.all())
            for d in tasks:
                try:
                    c = next(tasks_iter)
                except StopIteration:
                    c = Conclusions.objects.create(shift=self)
                c.comment = d["comment"]
                c.done = d["done"]
            for c in tasks_iter:
                c.delete()
        self.cache = Cache(**cache)
        if missing_products is not None:
            self.missing_products = []
            for p in missing_products:
                product, _ = Product.objects.get_or_create(name=p)
                self.missing_products.append(p)
        self.save()

    def get_or_create_member(self, username):
        user, _ = User.objects.get_or_create(username)
        member, _ = Member.objects.get_or_create(user=user)
        return member


class MemberShift(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    shift_number = models.IntegerField(null=False)

    def serialize(self):
        return dict(member=self.member.serialize(), role=self.role.serialize(), shift_number=self.shift_number)


class Task(models.Model):
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    comment = models.TextField()
    done = models.BooleanField(default=False)

    def serialize(self):
        return dict(comment=self.comment, done=self.done)


class Conclusions(Task):
    assigned_team = models.CharField(max_length=128)

    def serialize(self):
        return dict(comment=self.comment, assigned_team=self.assigned_team, done=self.done)
