import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smartrec_backend.settings")  # ✅ Use smartrec_backend.settings

app = Celery("smartrec")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
