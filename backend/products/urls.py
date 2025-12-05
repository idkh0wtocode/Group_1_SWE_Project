from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductImageViewSet, ProductsViewSet, CategoryViewSet, ProductListAll, ProductUserList, ListingsAPI

router = DefaultRouter()
router.register(r'products', ProductsViewSet, basename='products')
router.register(r'product_image', ProductImageViewSet, basename='product_image')
router.register(r'category', CategoryViewSet, basename='category')

urlpatterns = [
    path("all/", ProductListAll.as_view(), name="all-products-list"),
    path('', include(router.urls)),
    path('listings/', ListingsAPI.as_view()),
]
