from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


app_name = 'articles'


urlpatterns = [
    path('', views.index, name='index'),
    path('<int:article_pk>/', views.detail, name='detail'),
    path('<int:article_pk>/scrap/', views.scrap, name='scrap'),
    path('<int:article_pk>/comment/', views.comment_create),
    path('<int:article_pk>/comment/<int:comment_pk>/', views.comment_ud),
    path('search/', views.search),
    path('hashtag/', views.hashtag),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)