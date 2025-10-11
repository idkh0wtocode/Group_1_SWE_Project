from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100) # title of the note
    content = models.TextField() # content of the note
    created_at = models.DateTimeField(auto_now_add=True) # timestamp when note is created
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes') # link note to user
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
