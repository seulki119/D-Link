from django.contrib import admin
from .models import Topic, Vote, VS_Comment
# Register your models here.

admin.site.register(Topic)
admin.site.register(Vote)
admin.site.register(VS_Comment)