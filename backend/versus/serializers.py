from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Topic, VS_Comment, Vote

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'image')



class TopicSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Topic
        fields = '__all__'
        read_only_fields = ('id', 'user', ' topic_A', 'topic_B','image_A','image_B')    


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Vote
        fields = '__all__'
        read_only_fields = ('id','user','topic','select_A','select_B')




class VS_CommentCommentSerializer(serializers.ModelSerializer):
    user  = UserSerializer(required=False)

    class Meta:
        model = VS_Comment
        fields = '__all__'
        read_only_fields = ('id', 'user', 'comment','select')  