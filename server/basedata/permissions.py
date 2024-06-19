from rest_framework import permissions
from account.models import CustomUser
from rest_framework.exceptions import PermissionDenied, APIException


def have_permission_gt(value):

    class HavePermission(permissions.BasePermission):
        def has_permission(self, request, view):
            if request.method == "OPTIONS":
                return True
            if value is False:
                raise APIException('Неправильная структура запроса')
            if value == "pass":
                return True
            
            if not request.user:
                raise PermissionDenied('Такого пользователя не существует, или вы забыли указать токен')
            if request.user.role > value:
                return True
            else:
                raise PermissionDenied("У вас нет прав для доступа!")
            
    return HavePermission
