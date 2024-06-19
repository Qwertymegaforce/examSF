from machine.models import Machine, Service, Complaint
from infobooks.models import InfoBook
from infobooks.serializers import InfoBookSerializer
from account.serializers import CustomUserSerializer
from account.models import CustomUser
from datetime import datetime
from basedata.exec_validators import validate_unique
from basedata.serializermixin import SerializerMixin
from rest_framework import serializers
from .serializer_utils import fields_for_errors


class MachineSerializer(SerializerMixin):

    model = InfoBookSerializer()
    engine = InfoBookSerializer()
    transmission = InfoBookSerializer()
    bridge_design = InfoBookSerializer()
    bridge_pattern = InfoBookSerializer()
    client = CustomUserSerializer()
    service_company = CustomUserSerializer()

    
    def create(self, validated_data):
        def get_name(name):
            return self.context.get('data')[name]
        machine = Machine.objects.create(
            model = InfoBook.objects.get(id=get_name('model')),
            engine = InfoBook.objects.get(id=get_name('engine')),
            transmission = InfoBook.objects.get(id=get_name('transmission')),
            bridge_design = InfoBook.objects.get(id=get_name('bridge_design')),
            bridge_pattern = InfoBook.objects.get(id=get_name('bridge_pattern')),
            client = CustomUser.objects.get(id=get_name('client')),
            service_company = CustomUser.objects.get(id=get_name('service')),
            **validated_data
        )
        return machine
    
    def update(self, instance, validated_data):
        data = self.context.get('data')
        instance.umn = validated_data.get("umn", instance.umn)
        instance.model = InfoBook.objects.get(id=data.get("model", instance.model))
        instance.engine = InfoBook.objects.get(id=data.get("engine", instance.engine))
        instance.uen = validated_data.get("uen", instance.uen)
        instance.transmission = InfoBook.objects.get(id=data.get("transmission", instance.transmission))
        instance.utn = validated_data.get('utn')
        instance.bridge_design = InfoBook.objects.get(id=data.get("bridge_design", instance.bridge_design))
        instance.ubdn = validated_data.get('ubdn')
        instance.bridge_pattern = InfoBook.objects.get(id=data.get("bridge_pattern", instance.bridge_pattern))
        instance.ubpn = validated_data.get('ubpn')
        instance.supply_contract = validated_data.get('supply_contract')
        instance.ship_date = validated_data.get("ship_date", instance.ship_date)
        instance.consignee = validated_data.get('consignee')
        instance.adress = validated_data.get('adress')
        instance.equipment = validated_data.get('equipment', '')
        instance.client = CustomUser.objects.get(id=self.context.get('data').get('client', instance.service_company))
        instance.service_company = CustomUser.objects.get(id=self.context.get('data').get('service', instance.service_company))
        
        instance.save()
        return instance
    
    def validate(self, data):
        method = self.context.get('method', False)
        for field in ['umn', "uen", "utn", "ubdn", "ubpn"]:
            if method == "PUT":
                try:
                    if eval(f"Machine.objects.get(id=self.context.get('id', False)).{field} == data.get('{field}', False)"):
                        continue
                except:
                    raise serializers.ValidationError(f'Во время обновления вы передали несуществующее поле!')
            if validate_unique("Machine", field, data):
                raise serializers.ValidationError(f"Поле {fields_for_errors[field]} должно быть уникальным!")
        return data

    class Meta:
        model = Machine
        fields = "__all__"


class ServiceSerializer(SerializerMixin):
    type = InfoBookSerializer()
    machine = MachineSerializer()
    service_company = CustomUserSerializer()

    class Meta:
        model = Service
        fields = "__all__"

    def validate(self, data):
        date = data.get('date')
        order_date = data.get('order_date')
        if order_date > date:
            raise serializers.ValidationError('Дата ТО не может быть позже даты заказ-наряда!')
        is_put = self.context.get('method', None)
        try:
            machine_date = Machine.objects.get(id = self.context.get('data')['id'] if not is_put else Service.objects.get(id = self.context.get('data')['id']).machine.id).ship_date
        except:
            raise serializers.ValidationError('Экзепляра машины с указанным id не существует!')

        if order_date < machine_date:
            raise serializers.ValidationError('Восстановление не может проводиться раньше фактического выпуска техники!')
        return data

    def create(self, validated_data):
        def get_name(name):
            return self.context.get('data')[name]
        
        service = Service.objects.create(
            type = InfoBook.objects.get(id=get_name('type')),
            machine = Machine.objects.get(id=get_name('id')),
            service_company = Machine.objects.get(id=get_name('id')).service_company,
            **validated_data
        )
        return service
    
    def update(self, instance, validated_data):
        def get_name(name):
            return self.context.get('data')[name]
        instance.type = InfoBook.objects.get(id=get_name('type'))
        instance.date = validated_data.get("date", instance.date)
        instance.operating_time = validated_data.get("operating_time", instance.operating_time)
        instance.order_number = validated_data.get("order_number", instance.order_number)
        instance.order_date = validated_data.get("order_date", instance.order_date)
        instance.organization = validated_data.get("organization", instance.organization)
        instance.machine = instance.machine
        instance.service_company = instance.service_company

        instance.save()
        return instance
    

class ComplaintSerializer(SerializerMixin):

    method = InfoBookSerializer()
    node = InfoBookSerializer()
    machine = MachineSerializer()
    service_company = CustomUserSerializer()


    class Meta:
        model = Complaint
        fields = "__all__"
    
    def create(self, validated_data):
        def get_name(name):
            return self.context.get('data')[name]
        
        complaint = Complaint.objects.create(
            node = InfoBook.objects.get(id=get_name('node')),
            method = InfoBook.objects.get(id=get_name('method')),
            machine = Machine.objects.get(id=get_name('id')),
            service_company = Machine.objects.get(id=get_name('id')).service_company,
            wasted_time = datetime.strptime(get_name('repair_date'), '%Y-%m-%d') - datetime.strptime(get_name('disorder_date'), '%Y-%m-%d'),
            **validated_data
        )
        return complaint
    
    def validate(self, data):
        disorder_date = data.get('disorder_date')
        repair_date = data.get('repair_date')
        if disorder_date > repair_date:
            raise serializers.ValidationError('Дата восстановления не может быть раньше даты поломки!')
        is_put = self.context.get('method', None)
        try:
            machine_date = Machine.objects.get(id = self.context.get('data')['id'] if not is_put else Complaint.objects.get(id = self.context.get('data')['id']).machine.id).ship_date
        except:
            raise serializers.ValidationError('Экзепляра машины с указанным id не существует!')

        if disorder_date < machine_date:
            raise serializers.ValidationError('Отказ не может произойти раньше фактического выпуска техники!')
        
        return data
    
    
    def update(self, instance, validated_data):
        def get_name(name):
            return self.context.get('data')[name]
        instance.disorder_date = validated_data.get("disorder_date", instance.disorder_date)
        instance.operating_time = validated_data.get("operating_time", instance.operating_time)
        instance.node = InfoBook.objects.get(id=get_name('node'))
        instance.method = InfoBook.objects.get(id=get_name('method'))
        instance.description = validated_data.get("description", instance.description)
        instance.spare_parts = validated_data.get("spare_parts", instance.spare_parts)
        instance.repair_date = validated_data.get("order_date", instance.repair_date)
        instance.wasted_time = datetime.strptime(get_name('repair_date'), '%Y-%m-%d') - datetime.strptime(get_name('disorder_date'), '%Y-%m-%d')
        instance.machine = instance.machine
        instance.service_company = instance.service_company

        instance.save()
        return instance
