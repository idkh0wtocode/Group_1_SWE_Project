from django.contrib import admin
from .models import Messaging, QueueMessage

admin.site.register(Messaging)
admin.site.register(QueueMessage)