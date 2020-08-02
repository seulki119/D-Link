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

class UserUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'image', 'intro', 'taste1', 'taste2')

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




class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2)

    class Meta:
        fields = ['email']



class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        min_length=6, max_length=68, write_only=True)
    token = serializers.CharField(
        min_length=1, write_only=True)
    uidb64 = serializers.CharField(
        min_length=1, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)

            user.set_password(password)
            user.save()

            return (user)
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)
        return super().validate(attrs)
