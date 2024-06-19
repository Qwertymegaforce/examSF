from django.db import models
from account.models import CustomUser
from infobooks.models import InfoBook


class Machine(models.Model):
    umn = models.CharField(max_length=32)
    model = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='model')
    engine = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='engine')
    uen = models.CharField(max_length=32)
    transmission = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='transmission')
    utn = models.CharField(max_length=32)
    bridge_design = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='bridge_design')
    ubdn = models.CharField(max_length=32)
    bridge_pattern = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='bridge_pattern')
    ubpn = models.CharField(max_length=32)
    supply_contract = models.TextField(max_length=32)
    ship_date = models.DateTimeField()
    consignee = models.TextField()
    adress = models.TextField()
    equipment = models.TextField()
    client = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE, related_name='client')
    service_company = models.ForeignKey(to=CustomUser, on_delete=models.SET_NULL, related_name='service', null=True)


class Service(models.Model):
    type = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='service_type')
    date = models.DateTimeField()
    operating_time = models.IntegerField()
    order_number = models.TextField()
    order_date = models.DateTimeField()
    organization = models.TextField()
    machine = models.ForeignKey(to=Machine, on_delete=models.CASCADE, related_name='machine_service')
    service_company = models.ForeignKey(to=CustomUser, on_delete=models.SET_NULL, related_name='service_service', null=True)


class Complaint(models.Model):
    disorder_date = models.DateTimeField()
    operating_time = models.IntegerField()
    node = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='complaint_node')
    description = models.TextField()
    method = models.ForeignKey(to=InfoBook, on_delete=models.CASCADE, related_name='complaint_method')
    spare_parts = models.TextField()
    repair_date = models.DateTimeField()
    wasted_time = models.DurationField()
    machine = models.ForeignKey(to=Machine, on_delete=models.CASCADE, related_name='machine_complaint')
    service_company = models.ForeignKey(to=CustomUser, on_delete=models.SET_NULL, related_name='complaint_service', null=True)
    