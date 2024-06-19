from infobooks.models import InfoBook
from machine.models import Machine, Service, Complaint
from account.models import CustomUser


def validate_unique(model, field, data):
    """Returns True if field is not unique else False"""
    result = eval(f"""{model}.objects.filter({field}=data.get("{field}", False)).exists()""")
    return result