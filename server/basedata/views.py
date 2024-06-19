from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from infobooks.serializers import *
from account.serializers import *
from machine.serializers import *
from .permissions import have_permission_gt
from .utils import *


def create_obj(request, type):
    @api_view(["POST"])
    @permission_classes([have_permission_gt(create_gt.get(type, False))])
    def inner_creator(request, type):
        serializer = get_create_serializer(request, type, id)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(data=create_info_dict("Экзепляр успешно добавлен в базу!"), status=status.HTTP_201_CREATED)
    response = inner_creator(request, type)
    return response


def edit_obj(request, type, id):
    @api_view(["PUT"])
    @permission_classes([have_permission_gt(create_gt.get(type, False))])
    def inner_updater(request, type, id):
        if type == "user":
            return Response(create_info_dict('Изменение пользователей невозможно!'), status=status.HTTP_400_BAD_REQUEST)
        try:
            instance = type_models[type].objects.get(id=id)
        except:
            return Response(create_info_dict('Экзепляра с таким id не существует'), status=status.HTTP_400_BAD_REQUEST)
        if not check_obj_edit_permission(type, request.user, instance, id, 'update'):
            return Response(create_info_dict('У вас нет прав на изменение этого экзепляра!'))
        serializer = type_serializers[type](data=request.data, instance=instance, fields=field_update_exclude[type], context = context_update_provider(request, id))
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=create_info_dict('Справочник обновлен!'), status=status.HTTP_200_OK)
        return Response(create_info_dict('Произошла ошибка при обновлении!'), status=status.HTTP_400_BAD_REQUEST)
    response = inner_updater(request, type, id)
    return response



def list_objs(request, type, id=None):
    @api_view(["GET"])
    @permission_classes([have_permission_gt(get_gt.get(type, False))])
    def inner_getter(request, type):
        queryset = get_list_queryset(request, type)
        serializer = type_serializers[type](queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    response = inner_getter(request, type)
    return response


def get_specific(request, type, id):
    @api_view(["GET"])
    @permission_classes([have_permission_gt(get_specific_gt.get(type, False))])
    def inner_specific_getter(request, type, id):
        if type == 'user':
            return Response(create_info_dict('Для получения данных о пользователе используйте другой метод!'), status=status.HTTP_400_BAD_REQUEST)
        try:
           instance = type_models[type].objects.filter(id=id)
        except:
            return Response(create_info_dict('Экзепляра с таким id не существует'), status=status.HTTP_404_NOT_FOUND)
        if not check_obj_edit_permission(type, request.user, instance, id, "get"):
            return Response(create_info_dict('У вас нет прав для просмотра этого экзепляра!'), status=status.HTTP_403_FORBIDDEN)
        serializer = type_serializers[type](instance, many=True, fields = for_not_users_machine if type == "machine" and request.user.is_anonymous else set())
        return Response(serializer.data, status=status.HTTP_200_OK)
    response = inner_specific_getter(request, type, id)
    return response


def delete_obj(request, type, id):
    @api_view(["DELETE"])
    @permission_classes([have_permission_gt(create_gt.get(type, False))])
    def inner_deleter(request, type, id):
        try:
            instance = type_models[type].objects.get(id=id)
        except:
            return Response({"non_field_errors" : 'Экзепляра с таким id не существует'}, status=status.HTTP_404_NOT_FOUND)
        if not check_obj_edit_permission(type, request.user, instance, id, "delete"):
            return Response(create_info_dict('У вас нет прав на удаление этого экзепляра!'), status=status.HTTP_403_FORBIDDEN)
        instance.delete()
        return Response(create_info_dict('Объект успешно удален!'), status=status.HTTP_200_OK)
    response = inner_deleter(request, type, id)
    return response

        

