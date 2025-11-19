from rest_framework import serializers # rest framework serializers 
from .models import Cart, CartItem
from users.serializers import UserSerializer
from products.serializers import ProductsSerializer


class CartSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Cart
        fields = ['cart_id', 'user']

class CartItemSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    product = ProductsSerializer(read_only=True)

    class Meta:
        model = CartItem
        fields = ['cart', 'product', 'quantity']