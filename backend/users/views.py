


"""
    Questions to ask for each view:
        - What data do i need to display and manupulate?
        - What type of user ineractions? Crud?
        - Responses to send? Json for react frontend?
        - Who can see this resource?
        - Who can create a new instance of this resource? 
        - Who can modify or delete a specific, existing instance of this resource?
        - Who else, other than the creator, needs access to this specific instance, and what level of access do they need?
        - When a user requests a list of this resource, should they see all records, or only their own records?
"""

"""
    Things to do:
    - ensure there is authentication for each view: 
        - ProductsViewSet - all anyone to view, only owner to write/delete/edit (IsSellerorReadOnly)
        - CartViewSet/CartItemsViewSet-  only owner to view/write/delete/edit (IsAuthenticated)
        - OrdersViewSet - both buyer adn seller need access(IsBuyerOrSellerOrAdmin)
        - UserViewSet - only the user cshould be able to edit their own profile (IsOwnerOrAdmin)
    - make permissions.py file that sets permissions for sellers, admins, buyers, owners, etc.
    - fix query sets to only get what is correct(ex. for products only return the users products, for categories, only return products in that category(?), etc.)
"""

from django.shortcuts import render
# from django import request
from django.template import loader
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response

from .permissions import IsOwnerOrReadOnly
from .models import User
from .serializers import UserSerializer, UserCreateSerializer, UserUpdateSerializer


# methods are list, create, retrieve, update, partial_update, destroy
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    # this gets the permmissions based on the request beeing called
    def get_permissions(self):
        if self.action == 'create':
            permission_classes =  [IsOwnerOrReadOnly, IsAuthenticated, IsAdminUser]
        elif self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly | IsAdminUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    # this changes the query set based on the user
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)

    # this formats what data you want to be returned to the request
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        if self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
        
