from django.urls import path
from alarms import views


app_name = 'alarms'


urlpatterns = [
    path('Share', views.ShareMe.as_view()),
    path('Alarm', views.Alarm.as_view()),
]