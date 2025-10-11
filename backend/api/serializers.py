from django.contrib.auth.models import User # ORM
from rest_framework import serializers # rest framework serializers 
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta: # repreesents metadata about the serializer
        model = User
        fields = ['id', 'username', 'password'] # fields we want to include in the serialized representation accpeting and return new user
        extra_kwargs = {'password': {'write_only': True}} # password should only be write only

    def create(self, validated_data): # create method to handle user creation
        user = User.objects.create_user(**validated_data) # create user using validated data
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author'] # fields to include in the serialized representation
        extra_kwargs = {'author': {'read_only': True}} # author should be read only, set in the view based on the logged-in user