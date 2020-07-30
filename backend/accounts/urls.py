from django.urls import path
from .views import ChangePasswordView
from . import views

app_name = 'accounts'

urlpatterns = [
    path('password/', ChangePasswordView.as_view(), name='change-password'),
    path('google/', views.google_login, name='google_login'),
    path('taste/', views.taste),
    path('<str:username>/', views.mypage),
    path('duplicated/email/', views.email_duplicated),
    path('duplicated/username/', views.username_duplicated),
]
