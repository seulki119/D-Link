from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils.translation import ugettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    image = models.ImageField(upload_to='photos')
    intro = models.TextField()
    taste1 = models.CharField(max_length=30, null=True)
    taste2 = models.CharField(max_length=30, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    spouse_name = models.CharField(blank=True, max_length=100)
    date_of_birth = models.DateField(blank=True, null=True)
    
    # REGISTER_LOGIN_EMAIL = "email"
    # REGISTER_LOGIN_GOOGLE = "google"

    # REGISTER_LOGIN_METHOD = (
    #     (REGISTER_LOGIN_EMAIL, "Email"),
    #     (REGISTER_LOGIN_GOOGLE, "google"),
    # )
    def __str__(self):
        return self.email