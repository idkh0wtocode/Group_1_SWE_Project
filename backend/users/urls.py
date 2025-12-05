from django.urls import path, include
from rest_framework.routers import DefaultRouter
# routers allows you to quickly declare all of the common routes for a given resourcefull controller. 


from .views import *
from products.views import ProductUserList

# args are URL prefix, viewset class, basename(base to use for URL names), 


urlpatterns = [
    path('current/', CurrentUserView.as_view(), name="current-user"), 
    path('<int:pk>/products/', ProductUserList.as_view(), name="user-products"), 
]

# urlpatterns += router.urls