# Generated by Django 5.0.4 on 2024-06-10 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infobooks', '0002_alter_infobook_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infobook',
            name='title',
            field=models.CharField(max_length=32, unique=True),
        ),
    ]
