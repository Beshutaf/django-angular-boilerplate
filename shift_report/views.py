# -*- coding: utf-8 -*-
import csv
from datetime import datetime
from io import TextIOWrapper

from django.db.models import Q
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.exceptions import ParseError
from rest_framework.response import Response

from shift_report.forms import MemberForm
from shift_report.models import Member, Shift


@api_view(["GET"])
def index(request):
    return detail(request._request, *datetime.now().date().isoformat().split("-"))


@api_view(["GET", "POST"])
def detail(request, year, month, day):
    """
    {
     date: ...,
     member_shifts: [
        {
            member: "firstname lastname",
            role: "...",
            shift_number: "1"
        },
        ...
     ],
     new_members: [
        "firstname lastname",
        ...
     ],
     leaving_members: [
        "firstname lastname",
        ...
     ],
     conclusions: [
        {
            comment: "...",
            assigned_team: "...",
            done: true/false
        },
        ...
     ],
     money_at_shift_start: [
        {
            unit: "200",
            amount: "3"
        },
        ...
     ],
     money_at_shift_end: [
        {
            unit: "100",
            amount: "2"
        },
        ...
     ],
     money_from_shares: "600",
     money_from_cheques: "1200",
     money_from_cash: "1000",
     envelope_number: "1234",
     almost_missing_products: [
        "...",
        ...
     ],
     disposed_products: [
        "...",
        ...
     ],
    }
    """
    s, _ = Shift.objects.get_or_create(date="-".join((year, month, day)))
    json = is_return_json(request)
    if request.method == "POST":
        try:
            s.update(**request.data)
        except ValueError as e:
            raise ParseError(e)
        json = True
    return Response(s.serialize()) if json else render(request, "shifts/detail.html", dict(shift=s))


@api_view(["GET", "POST"])
def members(request):
    """
    [
     "firstname lastname",
     ...
    ]
    """
    if request.method == "POST":
        if request.FILES:
            for d in csv.DictReader(TextIOWrapper(request.FILES["csv_file"])):
                process_member(d)
        else:
            process_member(request.data or None)
    terms = request.GET.get("term")
    if terms:
        result = [m for t in terms.split()
                  for m in Member.objects.filter(Q(user__first_name__startswith=t) | Q(user__last_name__startswith=t))]
    else:
        result = Member.objects.all()
    if is_return_json(request):
        return Response([m.serialize() for m in result])
    return render(request, "members/list.html", dict(members=result, form=MemberForm()))


def process_member(fields):
    form = MemberForm(fields)
    if form.is_valid():
        form.save()


@api_view(["POST"])
def delete(request):
    get_object_or_404(Member, pk=request.data["pk"]).delete()
    return redirect("/members")


def is_return_json(request):
    return request.GET.get("format") == "json" or request.is_ajax()
