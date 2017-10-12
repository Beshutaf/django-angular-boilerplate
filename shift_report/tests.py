# -*- coding: utf-8 -*-
from django.core.urlresolvers import reverse
from django.test import Client
from django.test import TestCase
from django.utils import six
from django.utils import timezone
from rest_framework import status

from .models import Shift, MemberShift, Member, Role, User

MEMBERS = [
    ("יונתן", 'אחמ"ש'),
    ("גלי", 'תורן'),
    ("מיכל", 'תורן'),
]


def add_members(s):
    for name, role in MEMBERS:
        MemberShift.objects.create(member=Member.objects.create(user=User.objects.get_or_create(username=name)[0]),
                                   shift=s, role=Role.objects.get_or_create(name=role)[0], shift_number=1)


class ShiftModelTests(TestCase):
    def test_add_members(self):
        s, is_new = Shift.objects.get_or_create(date=timezone.now())
        add_members(s)
        self.assertEqual(len(s.members.all()), len(MEMBERS))


class ShiftViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.date = timezone.now()
        s, is_new = Shift.objects.get_or_create(date=timezone.now())
        add_members(s)

    def test_list_members(self):
        response = self.client.get(reverse("members"), data={"format": "json"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_content = response.content
        if six.PY3:
            response_content = str(response_content, encoding="utf8")
        self.assertJSONEqual(response_content, [m for m, _ in MEMBERS])
