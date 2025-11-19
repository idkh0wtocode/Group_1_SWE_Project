from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.conf import settings
from django.utils import timezone
import uuid


class QueueMessage(models.Model):
    senderID = models.CharField(max_length=255)
    receiverID = models.CharField(max_length=255)
    lastMessageID = models.IntegerField(null = True, blank = True)

    class Meta: 
        constraints = [
            models.UniqueConstraint(fields = ['senderID', 'receiverID'],
                                    name = 'uniqueName')
        ]

class Messaging(models.Model):
    messageID = models.AutoField(primary_key=True)
    senderID = models.CharField(max_length=255)
    receiverID = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add = True)
    
