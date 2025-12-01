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

from django.shortcuts import render, get_object_or_404
# from django import request
from django.template import loader
from rest_framework import generics, viewsets # GenericAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from .models import Products, Category, ProductImage
from .serializers import ProductsSerializer, ProductImageSerializer, CategorySerializer
from users.permissions import IsOwnerOrReadOnly



# methods are list, create, retrieve, update, partial_update, destroy
class ProductsViewSet(viewsets.ModelViewSet):
    serializer_class = ProductsSerializer
    permission_classes = [IsOwnerOrReadOnly] #[IsAuthenticated]

    # this gets the permmissions based on the request beeing called
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]  # Anyone can view/explore
        else:
            permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]  # Only owner can modify
        return [permission() for permission in permission_classes]
    
    # this changes the query set based on the user
    def get_queryset(self):
        # Admin users can see all products
        if self.request.user.is_authenticated and (self.request.user.is_staff or self.request.user.is_superuser):
            return Products.objects.all()
        
        # Regular users only see their own products unless exploring
        queryset = Products.objects.all()
        user = self.request.user
        explore = self.request.query_params.get("explore", None)
        if explore == "true":
            return queryset
        else:
            if user.is_authenticated:
                return Products.objects.filter(seller=user)
            return queryset
    
    def perform_create(self, serializer):
        # Set the seller to the currently authenticated user.
        product = serializer.save(seller=self.request.user)
        
        # Handle image upload if provided
        image_file = self.request.FILES.get('image')
        if image_file:
            ProductImage.objects.create(
                product=product,
                image=image_file,
                is_main=True
            )

    def perform_update(self, serializer):
        # Update the product
        product = serializer.save()
        
        # Handle image upload if provided
        image_file = self.request.FILES.get('image')
        if image_file:
            # Delete old main image if exists
            ProductImage.objects.filter(product=product, is_main=True).delete()
            # Create new main image
            ProductImage.objects.create(
                product=product,
                image=image_file,
                is_main=True
            )


class ProductListAll(generics.ListCreateAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [AllowAny]


class ProductUserList(generics.ListCreateAPIView):
    serializer_class = ProductsSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Products.objects.filter(seller=user)

class ProductImageViewSet(viewsets.ModelViewSet):
    serializer_class = ProductImageSerializer
    permission_classes = [IsAuthenticated]
    queryset = ProductImage.objects.all()


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer # retursn all of the categories
    permission_classes = [AllowAny] # allows anyone to access all of the process
    queryset = Category.objects.all() # grabs all of the categories
    
    
        

