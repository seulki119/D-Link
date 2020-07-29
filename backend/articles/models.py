from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from PIL import Image
import os
from uuid import uuid4
from django.utils import timezone


# def date_upload_to(instance, filename):
#   # upload_to="%Y/%m/%d" 처럼 날짜로 세분화
#   ymd_path = timezone.now().strftime('%Y/%m/%d') 
#   # 길이 32 인 uuid 값
#   uuid_name = uuid4().hex
#   # 확장자 추출
#   extension = os.path.splitext(filename)[-1].lower()
#   # 결합 후 return
#   return '/'.join([
#     ymd_path,
#     uuid_name + extension,
#   ])


class Hashtag(models.Model):
    tag = models.CharField(max_length=20)

# Create your models here.
class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    image = models.ImageField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    content = models.TextField()
    scrap = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='scrapSet')
    hashtag = models.ManyToManyField(Hashtag, related_name='hashtagSet')


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='commentLikeSet')

class Recomment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    content = models.TextField()
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='recommentLikeSet')




