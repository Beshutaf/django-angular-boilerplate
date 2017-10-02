from django.conf.urls import include, url
from django.contrib import admin
from django.template.response import TemplateResponse
from django.views.generic import TemplateView, RedirectView
from django.contrib.staticfiles.views import serve
from shifts import settings

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name="home"),
    #url(r'^api/', include('api.urls')),

    url(r'^favicon.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'favicon.ico')),

    url(r'^robots.txt$',
        lambda request: TemplateResponse(
            request,
            template='robots.txt',
            content_type='text/plain',
        )
    ),
    
    url(r'^admin/', admin.site.urls),
    url(r'^', include('shift_report.urls')),
    # url('^', include('django.contrib.auth.urls')),
]

if settings.DEBUG:
    urlpatterns += [
        url(r'^(?P<path>.*)$', serve),
]