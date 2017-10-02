from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)


class Shift(models.Model):
    date = models.DateField(unique=True)
    members = models.ManyToManyField(Member, through="MemberShift")

    def serialize(self):
        return dict(date=self.date, member_shifts=[m.serialize() for m in self.membershift_set.all()])


class Role(models.Model):
    name = models.CharField(max_length=128)


class MemberShift(models.Model):
    member = models.ForeignKey(Member)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    role = models.ForeignKey(Role)
    shift_number = models.IntegerField()

    def serialize(self):
        return dict(member=self.member.user.username, role=self.role.name,
                    shift_number=self.shift_number)
