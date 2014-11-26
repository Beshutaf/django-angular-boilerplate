from settings import *

DEBUG = True
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader'
)

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Add frontend assets to static files
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, WEBAPP_NAME, 'dist',),
)