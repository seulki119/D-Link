from rest_framework import serializers
from .models import Article, Comment
from  accounts.models import User
import uuid
import base64

from drf_extra_fields.fields import Base64ImageField

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'Image', 'Intro', 'scrapSet', 'article_set')

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')



    

class ArticleCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Article
        exclude = ['scrap']
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')
        
class ArticleListSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Article
        fields = ('id', 'user', 'image', 'scrap')
        read_only_fields = ('id', 'user', 'scrap')

class ArticleScrapSerializer(serializers.ModelSerializer):

    class Meta:
        model= Article
        fields = ['scrap']