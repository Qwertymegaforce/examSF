# Generated by Django 5.0.4 on 2024-05-29 07:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infobooks', '0001_initial'),
        ('machine', '0003_alter_machine_bridge_design'),
    ]

    operations = [
        migrations.AlterField(
            model_name='machine',
            name='bridge_pattern',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bridge_pattern', to='infobooks.infobook'),
        ),
    ]