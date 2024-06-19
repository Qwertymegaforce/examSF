from rest_framework.exceptions import NotAuthenticated
from .utils_const import *



def get_create_serializer(request, type, id):
   provide_context = ",context = {'data' : request.data.dict(), 'id': id}" if type not in ['infobook', "user"] else ""
   provide_exclude = f",fields = exclude_fields_{type}" if type not in ['infobook', "user"] else ""
   serializer = eval(f"{type_str_serializers[type]}(data=request.data{provide_context}{provide_exclude})")
   return serializer


def get_list_queryset(request, type):
   queryset = type_models[type].objects.all()
   if type == "user":
      queryset = queryset.filter(is_superuser = False)
   elif type not in ["infobook", "user"]:
      token = request.META.get('HTTP_TOKEN', False)
      if not token:
         raise NotAuthenticated('Предоставьте токен для получения доступа к этой информации!')
      try:
         user = CustomUser.objects.get(token=token)
      except:
         raise NotAuthenticated("Пользователя с этим токеном не существует!")
      if user.role == 1:
         queryset = eval(f"{type_str_models[type]}.objects.filter({get_list_role_1[type]})")
      if user.role == 2:
         queryset = eval(f"{type_str_models[type]}.objects.filter({get_list_role_2[type]})")
   return queryset


def check_obj_edit_permission(type, user, instance, id, request_type):
   if user.is_anonymous and type != "machine":
      return False
   if user.is_anonymous and type == "machine":
      return True
   if user.role > 2:
      return True
   if user.role < 3 and type in ["infobook", "machine"] and request_type == "edit":
      return False
   return eval(f'{type_str_models[type]}.objects.filter({edit_check_role_1[type] if user.role == 1 else edit_check_role_2[type]}, id=id).exists()')


def context_update_provider(request, id):
      return {"data": request.data.dict(), "method": request.method, "id": id}