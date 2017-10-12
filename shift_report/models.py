from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models


class Member(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def serialize(self):
        return self.user.username


class Shift(models.Model):
    date = models.DateField(unique=True)
    members = models.ManyToManyField(Member, through="MemberShift")
    new_members = models.ManyToManyField(Member, related_name="new")
    leaving_members = models.ManyToManyField(Member, related_name="leaving")

    def serialize(self):
        return dict(date=self.date,
                    member_shifts=[m.serialize() for m in self.membershift_set.all()],
                    new_members=[m.serialize() for m in self.new_members.all()],
                    leaving_members=[m.serialize() for m in self.leaving_members.all()],
                    )


class Role(models.Model):
    name = models.CharField(max_length=128)

    def serialize(self):
        return self.name


class MemberShift(models.Model):
    member = models.ForeignKey(Member)
    shift = models.ForeignKey(Shift, on_delete=models.CASCADE)
    role = models.ForeignKey(Role)
    shift_number = models.IntegerField()

    def serialize(self):
        return dict(member=self.member.serialize(), role=self.role.serialize(), shift_number=self.shift_number)
