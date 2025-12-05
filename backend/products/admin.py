from django.contrib import admin
from .models import ProductImage, Products, Category

# Register your models here.
admin.site.register(ProductImage)
admin.site.register(Products)
admin.site.register(Category)