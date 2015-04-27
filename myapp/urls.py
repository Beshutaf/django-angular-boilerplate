from django.conf.urls import patterns, url
from django.template.response import TemplateResponse
from django.views.generic import TemplateView, RedirectView
from myapp import settings

urlpatterns = patterns(
    '',
    url(r'^$', TemplateView.as_view(template_name='index.html'), name="home"),
    #url(r'^api/', include('api.urls')),

    url(r'^favicon.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'favicon.ico')),

    url(r'^robots.txt$',
        lambda request: TemplateResponse(
            request,
            template='robots.txt',
            content_type='text/plain',
        )
    )
)

if settings.DEBUG:
    urlpatterns += patterns(
        'django.contrib.staticfiles.views',
        url(r'^(?P<path>.*)$', 'serve'),
)