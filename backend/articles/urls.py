from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


app_name = 'articles'


urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:article_pk>/', views.detail, name='detail'),
    path('<int:article_pk>/ud/', views.update_delete, name='update_delete'),
    path('<int:article_pk>/scrap/', views.scrap, name='scrap'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
