from account.models import CustomUser
from rest_framework import authentication
from rest_framework import exceptions

class CustomAuth(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.META.get('HTTP_TOKEN')
        if not token:
            return None

        try:
            user = CustomUser.objects.get(token=token)
        except:
            raise exceptions.AuthenticationFailed('Пользователя с этим токеном не существует!')

        return (user, None)