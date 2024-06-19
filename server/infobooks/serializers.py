from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import InfoBook
from basedata.exec_validators import validate_unique
from basedata.serializermixin import SerializerMixin



class InfoBookSerializer(SerializerMixin):

    class Meta:
        model = InfoBook
        fields = ['type', 'text', 'title', 'id']
        read_only_fields = ('id',)

    def validate(self, data):
        method = self.context.get('method', False)
        if method != "PUT" and not data.get('type', False):
            raise ValidationError('Вы не указали тип справочника!')
        if len(data.get('title')) > 32:
            raise ValidationError(f'Поле "название справочника" - не более 32 символов!')
        for field in ['title']:
            if method == "PUT":
                try:
                    if eval(f"InfoBook.objects.get(id=self.context.get('id', False)).{field} == data.get('{field}', False)"):
                        continue
                except:
                    raise ValidationError(f'Во время обновления вы передали несуществующее поле!')
            if validate_unique("InfoBook", field, data):
                raise ValidationError(f'Поле "Название справочника" должно быть уникальным!')
        return data

    def update(self, instance, validated_data):
        print('Обновить')
        instance.title = validated_data.get('title', instance.title)
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance
    
    
    
   

        