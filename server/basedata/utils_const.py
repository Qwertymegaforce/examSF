from infobooks.serializers import *
from account.serializers import *
from machine.serializers import *
from account.models import * 
from infobooks.models import * 
from machine.models import * 

create_gt = {
   "service" : 0,
   "complaint" : 1,
   "machine" : 2,
   "infobook": 2,
   "user": 3,
}

get_gt = {
   "service" : 0,
   "complaint" : 0,
   "machine" : 0,
   "infobook": 0,
   "user": 0,
}


get_specific_gt = {
   "service" : 0,
   "complaint" : 0,
   "machine" : 'pass',
   "infobook": 0,
   "user": 0,
}


type_serializers = {
   "service" : ServiceSerializer,
   "complaint" : ComplaintSerializer,
   "machine" : MachineSerializer,
   "infobook": InfoBookSerializer,
   "user": CustomUserSerializer,
}

type_str_serializers = {
   "service" : "ServiceSerializer",
   "complaint" : "ComplaintSerializer",
   "machine" : "MachineSerializer",
   "infobook": "InfoBookSerializer",
   "user": "CustomUserSerializer",
}

type_models = {
   "service" : Service,
   "complaint" : Complaint,
   "machine" : Machine,
   "infobook": InfoBook,
   "user": CustomUser,
}

type_str_models = {
   "service" : "Service",
   "complaint" : "Complaint",
   "machine" : "Machine",
   "infobook": "InfoBook",
   "user": "CustomUser",
}

get_list_role_1 = {
   "machine" : "client=user",
   "service" : "machine__client=user",
   "complaint" : "machine__client=user",
}

get_list_role_2 = {
   "machine" : "service_company=user",
   "service" : "service_company=user",
   "complaint" : "service_company=user",
}

edit_check_role_1 = {
    "service" : "machine__client=user",
    "complaint" : "machine__client=user",
    "machine": "client = user"
}

edit_check_role_2 = {
    "service" : "service_company=user",
    "complaint" : "service_company=user",
    "machine" : "service_company=user",
}

exclude_fields_machine = ('model', 'engine', 'transmission', 'bridge_design', 'bridge_pattern', 'client', 'service_company')
exclude_fields_service = ('type', 'service_company', 'machine')
exclude_fields_complaint = ('method', 'node', 'service_company', 'machine', "wasted_time")
exclude_field_infobook = ("type", )

for_not_users_machine = ('client', "service_company", 'supply_contract', 'consignee', 'adress', 'equipment', "ship_date")



field_update_exclude = {
   "service" : exclude_fields_service,
   "complaint" : exclude_fields_complaint,
   "machine" : exclude_fields_machine,
   "infobook": exclude_field_infobook,
}