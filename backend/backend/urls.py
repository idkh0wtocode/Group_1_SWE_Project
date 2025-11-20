# """
# URL configuration for backend project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.contrib import admin
# from django.urls import path, include

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path("api/", include("users.urls")),
#     path("api/", include("products.urls")),
#     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
# ]

# backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import UserViewSet
from products.views import ProductsViewSet, ProductImageViewSet, CategoryViewSet, ProductListAll, ProductUserList
from reports.views import ReportsViewSet


router = DefaultRouter()


router.register(r'users', UserViewSet, basename='user') 
router.register(r'products', ProductsViewSet, basename='products')
router.register(r'product-images', ProductImageViewSet, basename='product_image')
router.register(r'categories', CategoryViewSet, basename='category') 
router.register(r'reports', ReportsViewSet, basename='reports')


urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Include all the registered API endpoints under the 'api/' prefix
    # This single line creates your unified API root
    path('api/', include(router.urls)),
    #d path('api/listings/', ListingsAPI.as_view()),  # <-- added listings route
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
    path('', include('messaging.urls')),

    # You can keep other includes if you have them, but remove any
    # that point to your old, separate API app URLs.
    # For example, DELETE these lines if they exist:
    # path('api/users/', include('users.urls')),
    # path('api/', include('products.urls')),

    path('api/products/custom/', include("products.urls")),
    path('api/users/custom/', include("users.urls")),
]
