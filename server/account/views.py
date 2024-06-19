from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from .models import *
from django.contrib.auth import authenticate
from .utils import create_info_dict


@api_view(["POST"])
def specific_users(request):
    data = request.data.dict()
    role = data.get('role', False)
    user_list = CustomUser.objects.all().filter(first_name__contains = data['name'])
    if role:
        user_list = user_list.filter(role=role)
    serializer_list = CustomUserSerializer(user_list, many=True)
    return Response(data=serializer_list.data, status=status.HTTP_202_ACCEPTED)


@api_view(["POST"])
def login_user(request):
    data = request.data.dict()
    user = authenticate(username=data['username'], password=data['password'])
    if user:
        return Response(data={"token" : user.token, "role" : user.role}, status=status.HTTP_200_OK)
    return Response(data=create_info_dict('Неправильные логин или пароль'), status=status.HTTP_401_UNAUTHORIZED,)


@api_view(["GET"])
def user_data(request):
    token = request.META.get('HTTP_TOKEN')
    user = CustomUser.objects.filter(token=token)
    if user.exists():
        user = user.get(token=token)
        response = {
            "name": user.first_name,
            "role": user.role
        }
        return Response(data=response, status=status.HTTP_202_ACCEPTED)
    return Response(data=create_info_dict('Пользователя с этим токеном не существует'), status=status.HTTP_401_UNAUTHORIZED)

