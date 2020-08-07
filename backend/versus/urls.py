from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


app_name = 'versus'

urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create, name='create'),
    path('<int:topic_pk>/', views.detail, name='detail'),
    path('<int:topic_pk>/delete/', views.delete, name='delete'),
    path('<int:topic_pk>/update/', views.update, name='update'),
    path('<int:topic_pk>/vote/', views.vote, name='vote'),
    path('<int:topic_pk>/comment/', views.comment, name='comment'),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)