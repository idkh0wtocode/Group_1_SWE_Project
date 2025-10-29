# from django.contrib.auth.models import User # ORM
from rest_framework import serializers # rest framework serializers 
from .models import User

# instead of 'serializers.ModelSerializer', should we use 'serializers.HyperlinkedModelSerializer'? what's the difference?
class UserSerializer(serializers.ModelSerializer):
    class Meta: # represents metadata about the serializer
        model = User
        fields = ['id', 'username', 'email', 'dob', 'first_name', 'last_name', 'is_seller', 'created_at'] # fields we want to include in the serialized representation accpeting and return new user
        read_only_fields = ['id', 'created_at', 'is_seller']
        # extra_kwargs = {'password': {'write_only': True}} # password should only be write only

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'dob', 'first_name', 'last_name',  'password']


    def create(self, validated_data):
        # Create user and hash the password
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            dob=validated_data.get('dob'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            is_seller=validated_data.get('is_seller', False)
        )
        user.set_password(validated_data['password'])  # hashes the password
        user.save()
        return user
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'dob', 'first_name', 'last_name']