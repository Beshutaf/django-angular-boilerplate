from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def serialize(self):
        return self.user.username


class Role(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Money(models.Model):
    unit = models.IntegerField(null=False, primary_key=True)
    amount = models.IntegerField(null=False, primary_key=True)

    def serialize(self):
        return dict(unit=self.unit, amount=self.amount)


class Product(models.Model):
    name = models.CharField(max_length=128, primary_key=True)

    def serialize(self):
        return self.name


class Shift(models.Model):
    date = models.DateField(unique=True, db_index=True, primary_key=True)
    members = models.ManyToManyField(Member, through="MemberShift")
    new_members = models.ManyToManyField(Member, related_name="new")
    leaving_members = models.ManyToManyField(Member, related_name="leaving")
    money_at_shift_start = models.ManyToManyField(Money, related_name="shift_start")
    money_at_shift_end = models.ManyToManyField(Money, related_name="shift_end")
    money_from_shares = models.IntegerField(default=0)
    money_from_cheques = models.IntegerField(default=0)
    money_from_cash = models.IntegerField(default=0)
    envelope_number = models.IntegerField(default=0)
    almost_missing_products = models.ManyToManyField(Product, related_name="almost_missing")
    disposed_products = models.ManyToManyField(Product, related_name="disposed")

    def serialize(self):
        return dict(date=self.date,
                    member_shifts=[m.serialize() for m in self.membershift_set.all()],
                    new_members=[m.serialize() for m in self.new_members.all()],
                    leaving_members=[m.serialize() for m in self.leaving_members.all()],
                    conclusions=[c.serialize() for c in self.conclusions_set.all()],
                    money_at_shift_start=[m.serialize() for m in self.money_at_shift_start.all()],
                    money_at_shift_end=[m.serialize() for m in self.money_at_shift_end.all()],
                    money_from_shares=self.money_from_shares,
                    money_from_cheques=self.money_from_cheques,
                    money_from_cash=self.money_from_cash,
                    envelope_number=self.envelope_number,
                    almost_missing_products=[p.serialize() for p in self.almost_missing_products.all()],
                    disposed_products=[p.serialize() for p in self.disposed_products.all()],
                    )


class MemberShift(models.Model):
    member = models.ForeignKey(Member)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    role = models.ForeignKey(Role)
    shift_number = models.IntegerField(null=False)

    def serialize(self):
        return dict(member=self.member.serialize(), role=self.role.serialize(), shift_number=self.shift_number)


class Conclusions(models.Model):
    shift = models.ForeignKey(Shift)
    comment = models.TextField()
    assigned_team = models.CharField(max_length=128)
    done = models.BooleanField(default=False)

    def serialize(self):
        return dict(comment=self.comment, assigned_team=self.assigned_team, done=self.done)
