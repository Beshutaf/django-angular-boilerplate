# -*- coding: utf-8 -*-
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import six, timezone
from rest_framework import status

from .models import Shift, MemberShift, Member, Role, User

MEMBERS = [
    (u"יונתן", u'אחמ"ש'),
    (u"גלי", u'תורן'),
    (u"מיכל", u'תורן'),
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
            response = self.client.post(reverse("delete"), data=dict(pk=self.members[i].pk))
            self.assertEqual(response.status_code, status.HTTP_302_FOUND)
            self.assertJSONEqual(self.get_members(), [m for m, _ in MEMBERS[i + 1:]])

    def get_members(self):
        response = self.client.get(reverse("members"), data=dict(format="json"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return self.get_response_content(response)

    def test_get_shift(self):
        response = self.client.get(reverse("index"), data=dict(format="json"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(self.get_response_content(response), dict(
            date=self.date.date().isoformat(),
            member_shifts=[dict(member=name, role=role, shift_number=1) for name, role in MEMBERS],
            new_members=[],
            leaving_members=[],
            conclusions=[],
            money_at_shift_start=[],
            money_at_shift_end=[],
            money_from_shares=0,
            money_from_cheques=0,
            money_from_cash=0,
            envelope_number=0,
            almost_missing_products=[],
            disposed_products=[],
        ))

    @staticmethod
    def get_response_content(response):
        return str(response.content, encoding="utf8") if six.PY3 else response.content
