from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def home(request):
    return render(request, 'home.html')

def pianifica_visita(request):
    return render(request, 'visita/pianifica.html')

def orari(request):
    return render(request, 'visita/orari.html')

def opere(request):
    return render(request, 'esplora/opere.html')

def vita_volta(request):
    return render(request, 'esplora/vita.html')

def gioca(request):
    return render(request, 'gioca.html')

def search(request):
    query = request.GET.get('q', '')
    # Implementa la logica di ricerca qui
    return render(request, 'search.html', {'query': query, 'results': []})

def item(request, item_name):
    template = loader.get_template("item.html")
    context = {
        'item_name': item_name,
        'data': Item.objects.get(name=item_name),
        'events': Event.objects.filter(item=item_name),
        'restorations': Restoration.objects.filter(item__name=item_name),

    }
    return HttpResponse(template.render())

def images(request):
    allimages = Image.objects.all()
    return render(request, 'images.html',{'images': allimages})