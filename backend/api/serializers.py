from django.contrib.auth.models import User # ORM
from rest_framework import serializers # rest framework serializers 
from .models import *

# instead of 'serializers.ModelSerializer', should we use 'serializers.HyperlinkedModelSerializer'? what's the difference?
class UserSerializer(serializers.ModelSerializer):
    class Meta: # represents metadata about the serializer
        model = User
        fields = ['id', 'username', 'email', 'dob', 'first_name', 'last_name',  'password', 'created_at'] # fields we want to include in the serialized representation accpeting and return new user
        extra_kwargs = {'password': {'write_only': True}} # password should only be write only
