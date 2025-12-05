from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `seller` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must have an attribute named `seller`.
        return obj.seller == request.user


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Object-level permission to only allow users to edit their own profile
    or allow admins to edit any profile.
    """

    def has_object_permission(self, request, view, obj):
        # Admin users can do anything
        if request.user.is_staff or request.user.is_superuser:
            return True
        
        # Users can only edit their own profile
        return obj == request.user