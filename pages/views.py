from django.shortcuts import render

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
