# -*- coding: utf-8 -*-
import csv
from datetime import datetime
from io import TextIOWrapper

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404

from shift_report.forms import MemberForm
from shift_report.models import Member, Shift


def index(request):
    return detail(request, *datetime.now().date().isoformat().split("-"))


def detail(request, *year_month_day):
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
    s, _ = Shift.objects.get_or_create(date="-".join(year_month_day))
    if request.method == "POST":
        for key, value in request.POST.items():
            setattr(s, key, value)
        s.save()
    return JsonResponse(s.serialize()) if is_return_json(request) else \
        render(request, "shifts/detail.html", {"shift": s})


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
            process_member(request.POST or None)
    return JsonResponse(m.username for m in Member.objects.all()) if is_return_json(request) else \
        render(request, "members/list.html", {"members": Member.objects.all(), "form": MemberForm()})


def process_member(fields):
    form = MemberForm(fields)
    if form.is_valid():
        form.save(Member.objects.create(user=User.objects.create_user(username=True)))


def delete(request):
    get_object_or_404(Member, pk=request.POST["pk"]).delete()
    return redirect("/members/")


def is_return_json(request):
    return request.GET.get("format") == "json" or request.is_ajax()
