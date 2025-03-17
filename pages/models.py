from django.db import models

class Image(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=500)
    img = models.ImageField(upload_to ='uploads/') 

class Item(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    description = models.CharField(max_length=2500)
    date = models.DateField(default="2000-01-01")  # Add parentheses to properly define the field
    type = models.CharField(  # Use CharField with choices for an enum-like behavior
        max_length=20,
        choices=[
            ('PERSONAL', 'personal object'),
            ('INVENTION', 'invention'),
            ('NOTES', 'notes'),
        ],
        default="PERSONAL"
    )