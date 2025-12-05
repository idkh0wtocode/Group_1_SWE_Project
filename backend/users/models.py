from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from django.conf import settings
from django.utils import timezone
import uuid

class User(AbstractUser):
    dob = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    groups = models.ManyToManyField(Group, related_name="api_user_set", blank=True)
    is_seller = models.BooleanField(default=True)

    def __str__(self):
        return self.username

class MarketplaceUser(models.Model):
    id = models.UUIDField(primary_key=True)
    email = models.TextField(unique=True)
    email_verified = models.BooleanField()
    role = models.TextField()
    password_hash = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'users'

    def __str__(self):
        return self.email

class Profile(models.Model):
    user_id = models.UUIDField(primary_key=True)
    full_name = models.TextField()
    bio = models.TextField(null=True)
    avatar_url = models.TextField(null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'profiles'

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'categories'

class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'tags'

class Listing(models.Model):
    id = models.UUIDField(primary_key=True)
    seller_id = models.UUIDField()
    type = models.TextField()
    category_id = models.IntegerField()
    title = models.TextField()
    description = models.TextField()
    price_cents = models.IntegerField()
    condition_note = models.TextField(null=True)
    status = models.TextField()
    is_active = models.BooleanField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    search_vector = models.TextField(null=True)

    class Meta:
        managed = False
        db_table = 'listings'

class ListingImage(models.Model):
    id = models.UUIDField(primary_key=True)
    listing_id = models.UUIDField()
    url = models.TextField()
    sort_order = models.IntegerField(null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'listing_images'

class ListingTag(models.Model):
    listing_id = models.UUIDField(primary_key=True)
    tag_id = models.IntegerField()
    created_at = models.DateTimeField(null=True)

    class Meta:
        managed = False
        db_table = 'listing_tags'

class Announcement(models.Model):
    id = models.UUIDField(primary_key=True)
    author_id = models.UUIDField()
    title = models.TextField()
    body = models.TextField()
    rsvp_link = models.TextField(null=True)
    event_time = models.DateTimeField(null=True)
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'announcements'

class AnnouncementRSVP(models.Model):
    announcement_id = models.UUIDField(primary_key=True)
    user_id = models.UUIDField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'announcement_rsvps'
