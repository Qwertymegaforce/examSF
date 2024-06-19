from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from account.utils import create_info_dict
from .utils import *
from basedata.utils_const import type_models


@api_view(['GET'])
def get_db_data(request, db, id):
    serializer = bring_serializer(
        model=type_models.get(db, False), 
        model_name=db,
        user=request.user, 
        id=id,
    )
    if not serializer[0]:
        return Response(create_info_dict(serializer[1]), status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data=serializer[1].data, status=status.HTTP_200_OK)