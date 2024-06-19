# Generated by Django 5.0.4 on 2024-06-19 07:36

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('machine', '0010_alter_complaint_service_company_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='complaint',
            name='service_company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='complaint_service', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='machine',
            name='service_company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='service', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='service',
            name='service_company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='service_service', to=settings.AUTH_USER_MODEL),
        ),
    ]
