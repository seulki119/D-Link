from django.urls import path, include
from .views import ChangePasswordView
from . import views
from django.views.generic import TemplateView

app_name = 'accounts'

urlpatterns = [
    path('password/', ChangePasswordView.as_view(), name='change-password'),
    path('google/', views.google_login, name='google_login'),
    path('taste/', views.taste),
    path('<str:username>/', views.mypage),
    path('duplicated/email/', views.email_duplicated),
    path('duplicated/username/', views.username_duplicated),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
   
]
