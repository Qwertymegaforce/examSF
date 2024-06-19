from rest_framework import permissions
from .models import CustomUser
from rest_framework.exceptions import PermissionDenied


class AdminAllowed(permissions.BasePermission):

    def has_permission(self, request, view):
        try: 
            data = request.data.dict()
            token = data['token']
            user = CustomUser.objects.filter(token=token)
            if user.exists():
                user = user.get(token=token)
                return user.is_superuser
        except:
            raise PermissionDenied('Вы не предоставили токен')


class ManagerAllowed(permissions.BasePermission):

    def has_permission(self, request, view):

        try: 
            data = request.data.dict()
            token = data['token']
            user = CustomUser.objects.filter(token=token)
            if user.exists():
                user = user.get(token=token)
                return user.role > 2
        except:
            raise PermissionDenied('Вы не предоставили токен')
        

class StaffOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == "OPTIONS":
            return True
        token = request.META.get('HTTP_TOKEN', False)
        user = CustomUser.objects.filter(token=token)
        if user.exists():
            user = user.get(token=token)
            return user.role > 0
        else:
            return False



class MustBeAuthorized(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "OPTIONS":
            return True
        token = request.META.get('HTTP_TOKEN', False)
        user = CustomUser.objects.filter(token=token)
        if user.exists():
            return True
        else:
            return False