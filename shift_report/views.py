import csv
from datetime import datetime
from io import TextIOWrapper

from django.contrib.auth.models import User
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404

from shift_report.forms import MemberForm
from shift_report.models import Member, Shift, MemberShift, Role


def index(request):
    return detail(request, *datetime.now().date().isoformat().split("-"))


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
    date_str = "-".join((year, month, day))
    s, is_new = Shift.objects.get_or_create(date=date_str)
    # if request.method == "POST":
    #     for key, value in request.POST.items():
    #         print(key + ": " + str(value))  # TODO set field in shift
    # s = Shift.objects.get_or_create(date=datetime.strptime(date_str, '%Y-%m-%d'))
    MemberShift.objects.create(member=Member(user=User.objects.get_or_create(username='יונתן')[0]),
                               shift=s, role=Role.objects.get_or_create(name='אחמ"ש')[0],
                               shift_number=1)
    MemberShift.objects.create(member=Member(user=User.objects.get_or_create(username='גלי')[0]),
                               shift=s, role=Role.objects.get_or_create(name='תורן')[0],
                               shift_number=1)
    MemberShift.objects.create(member=Member(user=User.objects.get_or_create(username='מיכל')[0]),
                               shift=s, role=Role.objects.get_or_create(name='תורן')[0],
                               shift_number=1)
    return JsonResponse(s.serialize())


def members(request):
    """
    [
     "firstname lastname",
     ...
    ]
    """
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
