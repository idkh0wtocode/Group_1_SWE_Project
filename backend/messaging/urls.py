from django.urls import path
from . import views

urlpatterns = [
    path('messages/<str:senderID>/<str:receiverID>/', views.get_messages, name = 'get_messages'),
    path('messages/send/', views.send_messages, name = 'send_messages'),
]

