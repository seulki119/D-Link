from django.urls import path
from alarms import views
from . import views
from django.views.decorators.csrf import csrf_exempt

app_name = 'alarms'


urlpatterns = [
    # path('Share/', views.ShareMe.as_view()),
    # path('Share', csrf_exempt(views.ShareMe.as_view())),
    path('Share/', csrf_exempt(views.ShareMe)),
    # path('Share/', views.ShareMe),
    path('Alarm', views.Alarm.as_view()),
]