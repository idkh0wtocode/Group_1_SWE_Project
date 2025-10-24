from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group
from django.conf import settings
from django.utils import timezone


import uuid
    
class User(AbstractUser): # ['id', 'username', 'email', 'dob', 'first_name', 'last_name',  'password', 'created_at']
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True) # unique identifier for the user
    dob = models.DateField(null=True, blank=True) # date of birth of the user
    created_at = models.DateTimeField(auto_now_add=True)
    groups = models.ManyToManyField(Group, related_name="api_user_set", blank=True)
    is_seller = models.BooleanField(default=True)

    def __str__(self):
        return self.username