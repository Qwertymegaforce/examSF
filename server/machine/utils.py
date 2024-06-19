from .models import *
from .serializers import *
from basedata.utils_const import type_str_models, type_serializers, for_not_users_machine


umnsearch_params = {
    'service': "machine__umn",
    "complaint": "machine__umn",
    "machine": "umn"
}



def bring_serializer(model, model_name, user, id):
    if not model:
        return [False, f"Указанной базы данных ({model_name}) не существует"]
    
    if not user and model != Machine:
        return [False, f"Вы не имеете прав доступа к этой модели: {model_name}"]
    
    queryset = eval(f'{type_str_models[model_name]}.objects.filter({umnsearch_params[model_name]}=id)')
    serializer = type_serializers[model_name](queryset, fields=for_not_users_machine if user.is_anonymous and model == Machine else set(), many=True)

    return [True, serializer]