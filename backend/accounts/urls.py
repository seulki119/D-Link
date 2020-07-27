from django.urls import path
from .views import ChangePasswordView
from . import views

app_name = 'accounts'

urlpatterns = [
    path('password/', ChangePasswordView.as_view(), name='change-password'),
    path('taste/', views.taste),
    path('<str:username>/', views.mypage),
]
