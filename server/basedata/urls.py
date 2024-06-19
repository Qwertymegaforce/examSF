from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('api/v1/list/<str:type>', list_objs),
    path('api/v1/create/<str:type>', create_obj),
    path('api/v1/edit/<str:type>/<int:id>', edit_obj),
    path('api/v1/delete/<str:type>/<int:id>', delete_obj),
    path('api/v1/specific/<str:type>/<int:id>', get_specific),
]
