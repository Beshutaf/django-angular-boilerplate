from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def serialize(self):
        return dict(id=self.user.pk, text=self.text)

    @property
    def text(self):
        return " ".join(filter(None, (self.user.first_name, self.user.last_name)))

    @classmethod
    def get(cls, username):
        first_name, _, last_name = username.partition(" ")
        user, _ = User.objects.get_or_create(username=username, first_name=first_name, last_name=last_name)
        member, _ = cls.objects.get_or_create(user=user)
        return member


class Role(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Money(models.Model):
    unit = models.IntegerField(null=False)
    amount = models.IntegerField(null=False)

    def serialize(self):
        return self.unit, self.amount

    @classmethod
    def get(cls, unit, amount):
        money, _ = cls.objects.get_or_create(unit=int(unit), amount=amount)
        return money


class Product(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Cache(models.Model):
    money_at_shift_start = models.ManyToManyField(Money, related_name="shift_start")
    money_at_shift_end = models.ManyToManyField(Money, related_name="shift_end")
    money_from_shares = models.IntegerField(default=0, null=True)
    money_from_cheques = models.IntegerField(default=0, null=True)
    money_from_cash = models.IntegerField(default=0, null=True)
    envelope_number = models.IntegerField(default=0, null=True)

    @staticmethod
    def empty():
        obj = Cache()
        obj.save()
        return obj.id

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
        del kwargs
        self.money_at_shift_start.set([Money.get(u, a) for u, a in money_at_shift_start.items()])
        self.money_at_shift_end.set([Money.get(u, a) for u, a in money_at_shift_end.items()])
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
    cache = models.ForeignKey(Cache, on_delete=models.CASCADE, default=Cache.empty, null=True)

    def serialize(self):
        return dict(members=[m.serialize() for m in self.membershift_set.all()],
                    new_members=[m.text for m in self.new_members.all()],
                    leaving_members=[m.text for m in self.leaving_members.all()],
                    tasks=[c.serialize() for c in self.task_set.all()],
                    conclusions=[c.serialize() for c in self.conclusions_set.all()],
                    missing_products=[p.serialize() for p in self.missing_products.all()],
                    cache=self.cache.serialize(),
                    )

    def update(self, date=None, members=None, new_members=None, leaving_members=None, conclusions=None, tasks=None,
               missing_products=None, cache=None, **kwargs):
        del kwargs
        if date is not None:
            self.date = date
        if members is not None:
            members_in_shift = self.add_member_shifts(members)
            MemberShift.objects.filter(shift=self).exclude(member__in=members_in_shift).delete()
        if new_members is not None:
            self.new_members.set([Member.get(m) for m in new_members])
        if leaving_members is not None:
            self.leaving_members.set([Member.get(m) for m in leaving_members])
        if tasks is not None:
            self.set_tasks(tasks)
        if conclusions is not None:
            self.set_conclusions(conclusions)
        if cache is not None:
            self.cache.update(**cache)
        if missing_products is not None:
            self.missing_products.set([Product.objects.get_or_create(name=p)[0] for p in missing_products])
        self.save()

    def add_member_shifts(self, members):
        members_in_shift = []
        for m in members:
            member = Member.get(m["member"])
            role, _ = Role.objects.get_or_create(name=m["role"])
            member_shift, _ = MemberShift.objects.get_or_create(shift=self, member=member, role=role,
                                                                shift_number=int(m["shift_number"]))
            member_shift.save()
            members_in_shift.append(member)
        return members_in_shift

    def set_tasks(self, tasks):
        for task in self.task_set.all():
            task.delete()
        for t in tasks:
            Task.objects.create(shift=self, **t)

    def set_conclusions(self, conclusions):
        for conclusion in self.conclusions_set.all():
            conclusion.delete()
        for c in conclusions:
            Conclusions.objects.create(shift=self, **c)


class MemberShift(models.Model):
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    shift_number = models.IntegerField(null=False)

    def serialize(self):
        return dict(member=self.member.serialize(), role=self.role.serialize(), shift_number=self.shift_number)


class Item(models.Model):
    comment = models.TextField()
    done = models.BooleanField(default=False)

    def serialize(self):
        return dict(comment=self.comment, done=self.done)


class Task(Item):
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)


class Conclusions(Item):
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    assigned_team = models.CharField(max_length=128)

    def serialize(self):
        d = super().serialize()
        d.update(assigned_team=self.assigned_team)
        return d
