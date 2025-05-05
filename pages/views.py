from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Item, Event, Restoration, Image

def home(request):
    template = loader.get_template("home.html")
    return HttpResponse(template.render())

def item(request, item_name):
    template = loader.get_template("item.html")
    context = {
        'item_name': item_name,
        'data': Item.objects.get(name=item_name),
        'events': Event.objects.filter(item=item_name),
        'restorations': Restoration.objects.filter(item__name=item_name),

    }
    return HttpResponse(template.render())