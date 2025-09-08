import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ROOT_URLCONF = "rocket_api.urls"
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    # Core
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # 3rd-party
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "djoser",
    "pgvector.django",

    # Local  (pick **one** of “matching” or “matcher”; don’t keep both)
    "accounts",
    "profiles",         # use AppConfig if you need signals: "profiles.apps.ProfilesConfig"
    "matching",         # or "matcher" if that’s the app you created
    "projects",
    "connections",
    "interactions",
    "graphsvc",
]

# CORS: middleware must be as high as possible, before CommonMiddleware
# (see docs). Do NOT prepend to an undefined MIDDLEWARE variable.
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",   # <— first (or near-top)
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# --- Auth / DRF ---
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
}
AUTH_USER_MODEL = "accounts.User"

# (Optional) Djoser tweaks
DJOSER = {
    "LOGIN_FIELD": "email",   # if you want email login; requires appropriate backend
}

# --- DB ---
# Use Postgres when env vars are present; otherwise sqlite for quick dev.
if os.getenv("DB_NAME"):
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DB_NAME"),
            "USER": os.getenv("DB_USER", "postgres"),
            "PASSWORD": os.getenv("DB_PASSWORD", ""),
            "HOST": os.getenv("DB_HOST", "127.0.0.1"),
            "PORT": os.getenv("DB_PORT", "5432"),
            "CONN_MAX_AGE": 60,
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

# --- Static / Media ---
STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# --- CORS (pick ONE strategy: allow-all for dev OR an explicit list) ---
CORS_ALLOW_ALL_ORIGINS = True     # DEV ONLY; remove in prod
# If you prefer explicit:
# CORS_ALLOWED_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"]
CORS_ALLOW_CREDENTIALS = True
