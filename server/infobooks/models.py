from django.db import models


class InfoBook(models.Model):
    choices = [
        ('model', 'model'),
        ('engine', 'engine'),
        ('transmission', 'transmission'), 
        ('bridge_design', 'bridge_design'), 
        ('bridge_pattern', 'bridge_pattern'), 
        ('technical_inspection', 'technical_inspection'), 
        ('node', 'node'), 
        ('repair_method', 'repair_method'), 

    ]
    title = models.CharField(max_length=32)
    text = models.TextField(blank=True)
    type = models.CharField(choices=choices, blank=True, max_length=24)
