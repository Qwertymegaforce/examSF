from django.urls import path
from .views import *


urlpatterns = [
    path('api/v1/loginuser', login_user),
    path('api/v1/getuserdata', user_data),
    path('api/v1/specificusers', specific_users),
]
