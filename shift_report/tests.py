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
    return [MemberShift.objects.create(member=Member.objects.create(user=User.objects.get_or_create(
        username=name, first_name=name)[0]),
                                       shift=s, role=Role.objects.get_or_create(name=role)[0], shift_number=1)
            for name, role in MEMBERS]


def get_expected_members(with_role=False):
    return [(dict(id=i, text=t), r) if with_role else
            dict(id=i, text=t) for i, (t, r) in list(enumerate(MEMBERS, start=1))]


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
        self.maxDiff = None

    def date_args(self):
        return dict(year="%04d" % self.date.year, month="%02d" % self.date.month, day="%02d" % self.date.day)

    def test_list_members(self):
        self.assertJSONEqual(self.get_members(), get_expected_members())

    def test_delete_members(self):
        for i in range(2):
            response = self.client.post(reverse("delete"), data=dict(pk=self.members[i].pk))
            self.assertEqual(response.status_code, status.HTTP_302_FOUND)
            self.assertJSONEqual(self.get_members(), get_expected_members()[i + 1:])

    def get_members(self):
        response = self.client.get(reverse("members"), data=dict(format="json"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return self.get_response_content(response)

    def test_get_shift(self):
        expected_data = dict(date=self.date.date().strftime("%d-%m-%Y"),
                             members=[dict(member=m, role=r, shift_number=1) for m, r in
                                      get_expected_members(with_role=True)],
                             new_members=[], leaving_members=[], tasks=[], conclusions=[],
                             cache=dict(money_at_shift_start=dict(), money_at_shift_end=dict(), money_from_shares=0,
                                        money_from_cheques=0, money_from_cash=0, envelope_number=0,
                                        ),
                             missing_products=[],
                             )
        for response in (self.client.get(reverse("index"), data=dict(format="json")),
                         self.client.get(reverse("detail", kwargs=self.date_args()), data=dict(format="json"))):
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertJSONEqual(self.get_response_content(response), expected_data)

    def test_get_empty_shift(self):
        date_args = dict(year="1970", month="01", day="01")
        response = self.client.get(reverse("detail", kwargs=date_args), data=dict(format="json"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertJSONEqual(self.get_response_content(response), {})

    # def test_update_shift(self):
    #     sent_data = dict(date=self.date.date().strftime("%d-%m-%Y"),
    #                      members=[dict(member=m["text"], role=r, shift_number=1) for m, r in
    #                               get_expected_members(with_role=True)],
    #                      new_members=[], leaving_members=[], tasks=[], conclusions=[],
    #                      cache=dict(money_at_shift_start=dict(), money_at_shift_end=dict(), money_from_shares=0,
    #                                 money_from_cheques=0, money_from_cash=0, envelope_number=0,
    #                                 ),
    #                      missing_products=[],
    #                      )
    #     response = self.client.post(reverse("detail", kwargs=self.date_args()),
    #                                 sent_data, content_type="application/json")
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    @staticmethod
    def get_response_content(response):
        return str(response.content, encoding=response.charset) if six.PY3 else response.content
