from django.urls import path
from . import views
# from django.views.decorators.csrf import csrf_exempt
from .views import ChangePasswordView

urlpatterns = [
    path('password/', ChangePasswordView.as_view(), name='change-password'),
]
