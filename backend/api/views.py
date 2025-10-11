from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
class NoteListCreate(generics.ListCreateAPIView): # handles listing and creating notes
    serializer_class = NoteSerializer # serializer to use
    permission_classes = [IsAuthenticated] # only authenticated users can access

    def get_queryset(self):
        user = self.request.user # get the logged-in user
        return Note.objects.filter(author=user) # return notes belonging to the user
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) # set the author to the logged-in user
        else:
            print (serializer.errors)

class NoteDelete(generics.DestroyAPIView): # handles deleting notes
    serializer_class = NoteSerializer # serializer to use
    permission_classes = [IsAuthenticated] # only authenticated users can access

    def get_queryset(self):
        user = self.request.user # get the logged-in user
        return Note.objects.filter(author=user) # return notes belonging to the user

class CreateUserView(generics.CreateAPIView): # handles creating new user/object
    queryset = User.objects.all() # all user objects
    serializer_class = UserSerializer # serializer to use type of data to accept toaccept new user
    permission_classes = [AllowAny]  # Allow anyone to create a user