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
        fields = ('id', 'username', 'image', 'intro', 'scrapSet', 'articleSet', 'taste1', 'taste2')

class UserSimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'taste1', 'taste2', 'image')

class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'intro', 'taste1', 'taste2')
        extra_kwargs = {
                'intro': {
                    # Tell DRF that the link field is not required.
                    'required': False,
                    'allow_blank': True,
                 }
            }

class UserImageUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['image']

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