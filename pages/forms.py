from django import forms
from .models import Image

class ImageForm(forms.ModelForm):
    """Form for the image model"""
    class Meta:
        model = Image
        fields = ('name', 'description', 'img')
        