from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    role = models.IntegerField(default=4)
    first_name = models.TextField(max_length=16, blank=False)
    token = models.TextField(max_length=32)
