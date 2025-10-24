from django.urls import path, include
from rest_framework.routers import DefaultRouter
# routers allows you to quickly declare all of the common routes for a given resourcefull controller. 


from .views import *

router = DefaultRouter()
# args are URL prefix, viewset class, basename(base to use for URL names), 
router.register(r'users', UserViewSet, basename='user') 


urlpatterns = [
    path('', include(router.urls)), # .urls is a standard list of url patterns
]

# urlpatterns += router.urls