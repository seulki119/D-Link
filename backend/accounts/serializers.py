from django.contrib.auth import get_user_model
from rest_framework import serializers
from articles.models import Article


User = get_user_model()

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'image')
        read_only_fields = ('id', 'image')

class UserSerializer(serializers.ModelSerializer):
    scrapSet = ArticleSerializer(many=True, read_only=True)
    articleSet = ArticleSerializer(many=True, read_only=True, source='article_set')

    class Meta:
        model = User
        fields = ('id', 'username', 'image', 'intro', 'scrapSet', 'articleSet')

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class UserTasteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'taste1', 'taste2')