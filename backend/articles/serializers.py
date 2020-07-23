from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Article, Comment

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
        fields = ('id', 'user', 'image')
        read_only_fields = ('id', 'user')

class ArticleScrapSerializer(serializers.ModelSerializer):

    class Meta:
        model= Article
        fields = ['scrap']