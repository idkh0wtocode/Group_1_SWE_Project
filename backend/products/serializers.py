from rest_framework import serializers # rest framework serializers 
from .models import Products, Category, ProductImage
from users.serializers import UserSerializer


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_main']

class ProductsSerializer(serializers.ModelSerializer):
    seller = UserSerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    status = serializers.CharField(required=False, default="In Stock")
    
    class Meta:
        model = Products
        fields = ['id', 'product_uuid', 'name', 'description', 'price', 'quantity', 'date_posted', 'seller', 'category', 'images', 'status']

class CategorySerializer(serializers.ModelSerializer):
    products = ProductsSerializer(source='products_category', many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['category_name', 'products']