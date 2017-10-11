# -*- coding: utf-8 -*-
from django.test import TestCase
from django.utils import timezone

from .models import Shift, MemberShift, Member, Role, User


MEMBERS = [
    ("יונתן", 'אחמ"ש'),
    ("גלי", 'תורן'),
    ("מיכל", 'תורן'),
]


class ShiftModelTests(TestCase):
    def test_add_members(self):
        s, is_new = Shift.objects.get_or_create(date=timezone.now())
        for name, role in MEMBERS:
            MemberShift.objects.create(member=Member.objects.create(user=User.objects.get_or_create(username=name)[0]),
                                       shift=s, role=Role.objects.get_or_create(name=role)[0], shift_number=1)
        self.assertEqual(len(s.members.all()), len(MEMBERS))
