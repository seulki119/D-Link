from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

# Create your models here.
class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    articleImage = models.ImageField(upload_to='photos')
    articleHashTag = CharField(max_length=100)
    articleCreatedAt = models.DateTimeField(auto_now_add=True)
    articleUpdatedAt = models.DateTimeField(auto_now=True)
    articleContent = models.TextField()

    scrap = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name=scrap_set)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    commentContent = models.TextField()
    commentCreatedAt = models.DateTimeField(auto_now_add=True)
    commentUpdatedAt = models.DateTimeField(auto_now=True)
    
    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name=commentLike_set)

class Recomment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    recommentContent = models.TextField()
    recommentCreatedAt = models.DateTimeField(auto_now_add=True)
    recommentUpdatedAt = models.DateTimeField(auto_now=True)

    like = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name=recommentLike_set)




