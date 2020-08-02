from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager
from django.utils.translation import ugettext_lazy as _



from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  


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



@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # title:
        "Password Reset for {title}".format(title="Some website title"),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )        