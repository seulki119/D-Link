from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:article_pk>/', views.detail, name='detail'),
    path('<int:article_pk>/scrap/', views.scrap, name='scrap'),
    path('<int:article_pk>/comment/', views.comment_create),
    path('<int:article_pk>/comment/<int:comment_pk>/', views.comment_ud),
]
