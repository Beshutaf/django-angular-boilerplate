from settings import *

DEBUG = False
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['myapp.com']

SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"

DATABASES = {}

TEMPLATE_LOADERS = (
    ('django.template.loaders.cached.Loader', (
        'django.template.loaders.filesystem.Loader',
        'django.template.loaders.app_directories.Loader',
    )),
)

# Add frontend assets to static files
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'webapp', 'dist',),
)

# Use gruntified index.html as template
TEMPLATE_DIRS += (
    os.path.join(BASE_DIR, 'webapp', 'dist',),
)