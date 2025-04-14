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
    image = models.ForeignKey(Image, on_delete=models.CASCADE, null=True, blank=True)  # ForeignKey to Image model
    event = models.ForeignKey('Event', on_delete=models.CASCADE, null=True, blank=True)  # ForeignKey to Event model

class Restoration(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(default="2000-01-01")  # Add parentheses to properly define the field
    type = models.CharField(  # Use CharField with choices for an enum-like behavior
        max_length=20,
        choices=[
            ('RESTORATION', 'restoration'),
            ('REPAIR', 'repair'),
            ('CLEANING', 'cleaning'),
        ],
        default="RESTORATION"
    )
    description = models.CharField(max_length=1000)


class Event(models.Model):
    name = models.CharField(max_length=20, primary_key=True)
    year = models.IntegerField()
    location = models.CharField(max_length=100)
    description = models.CharField(max_length=2500)
