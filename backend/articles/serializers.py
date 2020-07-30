from rest_framework import serializers
from  accounts.models import User
import uuid
import base64

from drf_extra_fields.fields import Base64ImageField
from .models import Article, Comment, Recomment, Hashtag
from django.contrib.auth import get_user_model

User = get_user_model()

class HashtagSerializser(serializers.ModelSerializer):

    class Meta:
        model = Hashtag
        fields = ('id', 'tag')
        read_only_fields = ('id', 'tag')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'image')

class RecommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Recomment
        fields = ('id', 'user', 'content', 'createdAt', 'updatedAt')
        read_only_fields = ('id', 'user', 'comment', 'createdAt', 'updatedAt', 'like')

class CommentSerializer(serializers.ModelSerializer):
    recommentSet = RecommentSerializer(many=True, read_only=True, source='recomment_set')
    user = UserSerializer(required=False)

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('id', 'user', 'article', 'createdAt', 'updatedAt', 'like')

class ArticleSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    image = serializers.ImageField(use_url=True)
    commentSet = CommentSerializer(many=True, read_only=True, source='comment_set')
    hashtag = HashtagSerializser(many=True, read_only=True)

    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('id', 'user', 'createdAt', 'updatedAt')

class ArticleCreateSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Article
        exclude = ['scrap', 'hashtag']
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