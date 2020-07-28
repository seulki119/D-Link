from rest_framework import serializers
from .models import Article, Comment
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'image')

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

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