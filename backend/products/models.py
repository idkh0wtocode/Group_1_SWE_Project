from django.db import models
from django.conf import settings

import uuid

# Create your models here.


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    category_name = models.CharField(max_length=100)

    def __str__(self):
        return self.category_name
    
    



class Products(models.Model):
    id = models.AutoField(primary_key=True)
    product_uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    # image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products', null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='products_category', null=True)

    PRODUCT_AVAILABILITY = {
        "In Stock": "In Stock",
        "Out of Stock": "Out of Stock",
    }
    status = models.CharField(choices=PRODUCT_AVAILABILITY, default="In Stock", max_length=20)


    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_images/')
    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.product.name}"