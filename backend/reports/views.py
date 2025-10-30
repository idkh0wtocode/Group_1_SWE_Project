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

from .models import Reports
from .serializers import ReportsSerializer

# methods are list, create, retrieve, update, partial_update, destroy
# must define the queryset, permission_classes, and the serializer_class
class ReportsViewSet(viewsets.ModelViewSet):
    serializer_class = ReportsSerializer
    permission_classes = [IsAuthenticated]

    # this gets the permmissions based on the request beeing called
    # def get_permissions(self):
    #     return [IsAuthenticated()]
    
    # this changes the query set based on the user
    def get_queryset(self):
        user = self.request.user
        # if user:
        #     return Products.objects.all()
        return Reports.objects.filter(reporter=user)
    
    def perform_create(self, serializer):
        # Set the seller to the currently authenticated user.
        serializer.save(reporter=self.request.user)

    
    
        

