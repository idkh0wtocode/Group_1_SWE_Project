from django.urls import path, include
from rest_framework.routers import DefaultRouter
# routers allows you to quickly declare all of the common routes for a given resourcefull controller. 


from .views import ProductImageViewSet, ProductsViewSet, CategoryViewSet, ProductListAll, ProductUserList

urlpatterns = [
    path("all/", ProductListAll.as_view(), name="all-products-list" ),
    
]

# urlpatterns += router.urls