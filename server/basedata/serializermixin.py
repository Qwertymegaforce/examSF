from rest_framework import serializers


class SerializerMixin(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
            fields = kwargs.pop('fields', None)
            super().__init__(*args, **kwargs)

            if fields is not None:
                for field_name in fields:
                    self.fields.pop(field_name)