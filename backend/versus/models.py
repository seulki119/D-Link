from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


# Create your models here.

class Topic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)            # 회원이 탈퇴해도 게시물은 남도록
    topic_A = models.CharField(max_length=100)
    topic_B = models.CharField(max_length=100)
    image_A = models.ImageField()
    image_B = models.ImageField()
    select_A = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='selectASet')
    select_B = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='selectBSet')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)


# class Vote(models.Model):
#     user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='voteSet')
#     topic = models.ForeignKey(Topic, on_delete=models.CASCADE) 
#     select_A = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='selectASet')
#     select_B = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='selectBSet')



class VS_Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)                         # 0이면 아무것도 아님 1이면 첫 번째, 2면 두 번재 컨텐츠
    comment = models.TextField()
    select = models.CharField(max_length=10)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)