import codecs
import csv
from datetime import datetime

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.shortcuts import render, redirect, get_object_or_404
from io import TextIOWrapper

from shift_report.forms import MemberForm
from shift_report.models import Shift, Member


def index(request):
    return detail(request, *datetime.now().date().isoformat().split("-"))


def detail(request, year, month, day):
    date_str = "-".join((year, month, day))
    s, is_new = Shift.objects.get_or_create(date=date_str)
    if request.method == "POST":
        for key, value in request.POST.items():
            print(key + ": " + str(value))  # TODO set field in shift
    return DjangoJSONEncoder().encode(s) if request.GET.get("format") == "json" else \
        render(request, "shifts/detail.html", {"shift": s})


def members(request):
    for m in Member.objects.all():
        m.delete()
    if request.method == "POST":
        if request.FILES:
            for d in csv.DictReader(TextIOWrapper(request.FILES["csv_file"])):
                process_member(d)
        else:
            process_member(request.POST or None)
    m = Member.objects.all
    return DjangoJSONEncoder().encode(m) if request.GET.get("format") == "json" else \
        render(request, "members/list.html", {"members": m, "form": MemberForm()})


def process_member(fields):
    form = MemberForm(fields)
    if form.is_valid():
        form.save(Member.objects.create(user=User.objects.create_user(username=True)))


def delete(request):
    get_object_or_404(Member, pk=request.POST["pk"]).delete()
    return redirect("/members/")
