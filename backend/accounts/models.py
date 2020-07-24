from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    userImage = models.ImageField(upload_to='photos')
    userIntro = models.TextField()

