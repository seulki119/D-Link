from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    userImage = models.ImageField()
    userEmail = models.CharField(max_length=100)
    userIntro = models.TextField()

