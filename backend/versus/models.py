from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


# Create your models here.

class Topic(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)            # 회원이 탈퇴해도 게시물은 남도록
    topic1 = models.CharField(max_length=100)
    topic2 = models.CharField(max_length=100)
    image1 = models.ImageField()
    image2 = models.ImageField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    

class VoteComment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    side = models.BooleanField()                            # True면 왼쪽의 topic(topic1)에 해당되는 comment
    comment = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)