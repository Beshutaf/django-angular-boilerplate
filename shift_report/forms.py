# -*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.forms import UserCreationForm

from shift_report.models import Member


class MemberForm(UserCreationForm):

    first_name = forms.CharField(label=u"שם פרטי", max_length=100)
    last_name = forms.CharField(label=u"שם משפחה", max_length=100)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in ("username", "password1", "password2"):
            self.fields.pop(key)

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = super(UserCreationForm, self).clean_password2()
        if bool(password1) ^ bool(password2):
            raise forms.ValidationError("Fill out both fields")
        return password2

    def save(self, commit=True):
        self.cleaned_data["username"] = " ".join((
            self.cleaned_data["first_name"], self.cleaned_data["last_name"]))
        self.cleaned_data["password1"] = self.cleaned_data["password2"] = None
        user = super().save(commit)
        member = Member.objects.create(user=user)
        member.user.first_name = self.cleaned_data["first_name"]
        member.user.last_name = self.cleaned_data["last_name"]
        member.save()
        member.user.username = member.pk
        if commit:
            member.user.save()
        return member
