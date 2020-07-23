from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib import admin
from .models import Article, Comment, Recomment
# from .serializers import UserSerializer
# Register your models here.

admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Recomment)