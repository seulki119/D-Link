from rest_framework import serializers
from .models import Alarm, Chat

class AlarmSerializser(serializers.ModelSerializer):

    class Meta:
        model = Alarm
        fields = '__all__'
        read_only_fields = ['id', 'isFetch']

class ChatSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chat
        fields = '__all__'
        read_only_fields = ['id']