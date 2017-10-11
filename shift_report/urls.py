from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^shifts$', views.index, name='index'),
    url(r'^shifts/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})$', views.detail),
    url(r'^members$', views.members),
    url(r'^members/delete$', views.delete),
    url('^', include('django.contrib.auth.urls')),
]
