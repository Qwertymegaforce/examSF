from django.urls import path
from .views import *


urlpatterns = [
    path('api/v1/getdbdata/<str:db>/<str:id>/', get_db_data)
]