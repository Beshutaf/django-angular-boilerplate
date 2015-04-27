from settings import *

DEBUG = True
TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

DATABASES = {}

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader'
)

# Add frontend assets to static files
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'webapp',),
    os.path.join(BASE_DIR, 'webapp', 'src',),
)

# Use gruntified index.html as template
TEMPLATE_DIRS += (
    os.path.join(BASE_DIR, 'webapp', 'src',),
)