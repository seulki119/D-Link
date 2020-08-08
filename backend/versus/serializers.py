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
        # read_only_fields 로 넣으면 바디로 넣어서 못받음
        read_only_fields = ('id', 'user', 'createdAt', 'updatedAt')    


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Vote
        fields = '__all__'
        read_only_fields = ('id','user')




class VS_CommentCommentSerializer(serializers.ModelSerializer):
    user  = UserSerializer(required=False)

    class Meta:
        model = VS_Comment
        fields = '__all__'
        read_only_fields = ('id', 'user', 'createdAt', 'updatedAt')  