import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

SECRET_KEY = 'SET_YOUR_SECRET_KEY!'

# Application definition
INSTALLED_APPS = (
    'myapp',
    'webapp',
)

ROOT_URLCONF = 'myapp.urls'

WSGI_APPLICATION = 'myapp.wsgi.application'

LANGUAGE_CODE = 'en-gb'

TIME_ZONE = 'Europe/London'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

TEMPLATE_DIRS = (
    os.path.join(BASE_DIR, 'templates'),
)

MIDDLEWARE_CLASSES = (
)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'formatters': {
        'simple': {
            'format': '%(levelname)s %(asctime)s %(module)s %(message)s'
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
            'formatter': 'simple'
        },
        'null': {
            'level': 'DEBUG',
            'class': 'django.utils.log.NullHandler',
        },
        'console': {
            # logging handler that outputs log messages to terminal
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',  # message level to be written to console
            'formatter': 'simple'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'django.db.backends': {
            'handlers': ['null'],  # Quiet by default!
            'propagate': False,
            'level': 'DEBUG'
        },
        'factory': {
            'handlers': ['null'],  # Quiet by default!
            'propagate': False,
            'level': 'DEBUG'
        },
        '': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True
        }
    }
}


# used by Gruntserver management command
SPA_WEBAPP = 'webapp'

from settings_local import *