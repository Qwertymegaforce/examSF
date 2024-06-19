from rest_framework import serializers
from .models import CustomUser
from .utils import create_info_dict
from .utils import token_generator, user_error_to_fields
from basedata.exec_validators import validate_unique


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'role', 'first_name', "id"]
        read_only_fields = ('id',)
        extra_kwargs = {
            'password': {'write_only': True},
            "username": {
                "validators": [],
            },
        }

    def validate(self, data):
        if not 0 < data['role'] < 4 and not isinstance(data.get('role', False), int):
            raise serializers.ValidationError(create_info_dict("В системе не существует подобной роли"))
        if " " in data["password"]:
            raise serializers.ValidationError(create_info_dict("Использование пробелов в пароле запрещено"))
        for field in ['first_name', 'username']:
            if validate_unique("CustomUser", field, data):
                raise serializers.ValidationError(f"Пользователь с этим {user_error_to_fields[field]} уже существует!")
        return data
        
     
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role'],
            first_name=validated_data['first_name'].replace(" ", "_"),
            token=token_generator(32)
        )
        return user
    
   

        