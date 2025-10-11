from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list'), # endpoint to list and create notes
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='delete-note'), # endpoint to delete a note by id
]
