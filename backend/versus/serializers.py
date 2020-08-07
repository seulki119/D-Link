from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Topic, VoteComment

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'image')



class TopicSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    topic1 = serializers.CharField(max_length=100)
    topic2 = serializers.CharField(max_length=100)
    image1 = serializers.ImageField(use_url=True)
    image2 = serializers.ImageField(use_url=True)

    
    class Meta:
        model = Topic
        fields = '__all__'
        read_only_fields = ('id', 'user', 'topic1', 'topic2','image1','image2')    


class VoteCommentSerializer(serializers.ModelSerializer):
    user  = UserSerializer(required=False)
    side  = serializers.BooleanField()   
    comment = serializers.TextField()

    
    class Meta:
        model = VoteComment
        fields = '__all__'
        read_only_fields = ('id', 'user', 'side', 'comment')  