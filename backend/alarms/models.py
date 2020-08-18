from django.db import models

# Create your models here.

class Alarm(models.Model):
    message=models.TextField()
    username=models.CharField(max_length=30)
    articleId=models.IntegerField()
    articleUserId=models.IntegerField()
    thumbnailPath=models.TextField()
    alarmType=models.IntegerField()
    isFetch=models.BooleanField(default=False)

class Chat(models.Model):
    message=models.TextField()
    username=models.CharField(max_length=30)
    roomId=models.IntegerField()