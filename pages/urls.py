from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.home, name='home'),
    path('gioco', views.gioco, name='gioco'),
    path('item/<str:item_name>', views.item, name='item'),
    path('images/', views.images, name='images'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
