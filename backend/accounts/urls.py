from django.urls import path
from .views import ChangePasswordView
from . import views

app_name = 'accounts'

urlpatterns = [
    path('password/', ChangePasswordView.as_view(), name='change-password'),
    path('google/', views.google_login, name='google_login'),
    path('kakao/',views.kakao_login, name='kakao_login'),
    path('kakao/callback/', views.kakao_callback),
    path('taste/', views.taste),
    path('user/', views.user_info),
    path('username/', views.username),
    path('<str:username>/', views.mypage),
    path('<str:username>/image/', views.image_update),
    path('duplicated/email/', views.email_duplicated),
    path('duplicated/username/', views.username_duplicated),
]
