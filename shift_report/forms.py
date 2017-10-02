from django import forms


class MemberForm(forms.Form):
    first_name = forms.CharField(label=u"שם פרטי", max_length=100)
    last_name = forms.CharField(label=u"שם משפחה", max_length=100)

    def save(self, member):
        member.user.first_name = self.cleaned_data["first_name"]
        member.user.last_name = self.cleaned_data["last_name"]
        member.save()
        member.user.username = member.pk
        member.user.save()
        return member
