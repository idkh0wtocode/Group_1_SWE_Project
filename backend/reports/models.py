from django.db import models
from django.conf import settings
import uuid

class Report(models.Model):
    report_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name='reports', null=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    date_reported = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
