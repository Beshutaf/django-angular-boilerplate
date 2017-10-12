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
    return [MemberShift.objects.create(member=Member.objects.create(user=User.objects.get_or_create(username=name)[0]),
                                       shift=s, role=Role.objects.get_or_create(name=role)[0], shift_number=1)
            for name, role in MEMBERS]


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
        self.members = add_members(s)

    def test_list_members(self):
        self.assertJSONEqual(self.get_members(), [m for m, _ in MEMBERS])

    def test_delete_members(self):
        for i in range(2):
            response = self.client.post(reverse("delete"), data={"pk": self.members[i].pk})
            self.assertEqual(response.status_code, status.HTTP_302_FOUND)
            self.assertJSONEqual(self.get_members(), [m for m, _ in MEMBERS[i + 1:]])

    def get_members(self):
        response = self.client.get(reverse("members"), data={"format": "json"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return self.get_response_content(response)

    def test_get_shift(self):
        response = self.client.get(reverse("index"), data={"format": "json"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertJSONEqual(self.get_response_content(response),
        #                      {"date": self.date.strftime()})

    @staticmethod
    def get_response_content(response):
        return str(response.content, encoding="utf8") if six.PY3 else response.content
