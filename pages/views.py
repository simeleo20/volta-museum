from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from .models import Item, Event, Restoration, Image

def home(request):
    return render(request, 'home.html')

def pianifica_visita(request):
    return render(request, 'visita/pianifica.html')

def orari(request):
    return render(request, 'visita/orari.html')

def opere(request):
    allitems = Item.objects.all()

    return render(request, 'esplora/opere.html', {'items': allitems})

def vita_volta(request):
    return render(request, 'esplora/vita.html')

def gioca_wordle(request):
    return render(request, 'gioca/wordle.html')

def gioca_memory(request):
    return render(request, 'gioca/memory.html')

def search(request):
    query = request.GET.get('q', '')
    # Implementa la logica di ricerca qui
    return render(request, 'search.html', {'query': query, 'results': []})

def item(request, item_name): #prende dal db
    oggetto = get_object_or_404(Item, name=item_name)
    eventi = Event.objects.filter(item__name=item_name)
    restauri = Restoration.objects.filter(item__name=item_name)

    context = {
        'item_name': item_name,
        'data': oggetto,
        'events': eventi,
        'restorations': restauri,
    }
    return render(request, 'item.html', context)


def images(request):
    allimages = Image.objects.all()
    return render(request, 'images.html',{'images': allimages})