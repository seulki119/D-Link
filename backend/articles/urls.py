from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:article_pk>/', views.detail, name='detail'),
    path('<int:article_pk>/ud/', views.update_delete, name='update_delete'),
    path('<int:article_pk>/scrap/', views.scrap, name='scrap'),
]
