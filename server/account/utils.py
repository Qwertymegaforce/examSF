import secrets
from .models import *


def token_generator(symbol_number):
    while True:
        token = secrets.token_hex(symbol_number) 
        if not CustomUser.objects.filter(token=token).exists():
            return token


def create_info_dict(message):
    return {'info' : message}


user_error_to_fields = {
    "username": "логином",
    "first_name": "именем"
}



