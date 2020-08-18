from django.urls import path
from alarms import views
from . import views
from django.views.decorators.csrf import csrf_exempt

app_name = 'alarms'


urlpatterns = [
    path('Share/', csrf_exempt(views.ShareMe)),
    path('<int:user_pk>/', views.alarm),
    path('room/<int:room_pk>/', views.chat),
]