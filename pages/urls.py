# museo_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('visita/pianifica/', views.pianifica_visita, name='pianifica_visita'),
    path('visita/orari/', views.orari, name='orari'),
    path('esplora/opere/', views.opere, name='opere'),
    path('esplora/vita/', views.vita_volta, name='vita_volta'),
    path('gioca/wordle/', views.gioca_wordle, name='gioca_wordle'),
    path('gioca/memory/', views.gioca_memory, name='gioca_memory'),
    path('search/', views.search, name='search'),
]
