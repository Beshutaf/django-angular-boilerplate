import os
from django.conf.urls import patterns, include, url
from django_angular import settings


# SHOULD NOT NEED THIS ID WE CAN PASS THROUGH STATIC FILES - SEE BELOW
urlpatterns = patterns('',
  # url(r'^', include('webapp.urls')),
)

# see http://stackoverflow.com/questions/17989341/django-serve-static-index-html-with-view-at-url/21805592?noredirect=1#comment42496840_21805592
if settings.DEBUG:
  WEBAPP_ROOT = os.path.join(settings.BASE_DIR, settings.WEBAPP_NAME, 'src')

  urlpatterns += patterns(
      'django.contrib.staticfiles.views',
      url(r'^(?:index.html)?$', 'serve',
          kwargs={'path': 'index.html', 'document_root': WEBAPP_ROOT}),

      url(r'^(?P<path>(?:js|css|img|data)/.*)$', 'serve', kwargs={'document_root': WEBAPP_ROOT}),
  )