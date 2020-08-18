from django.views.generic import TemplateView
from .models import Alarm, Chat
import json
from django.shortcuts import HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .consumers import UserTestConsumer
from .serializers import AlarmSerializser, ChatSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

def ShareMe(request):
    data_unicode=request.body.decode('utf-8')
    data=json.loads(data_unicode)
    print(data)

    alarm = Alarm()
    alarm.message = data['message']
    alarm.articleId = data['articleId']
    alarm.articleUserId = data['articleUserId']
    alarm.thumbnailPath = data['thumbnailPath']
    alarm.alarmType = data['alarmType']
    alarm.username = data['username']
    alarm.save()

    rx_user_id = data['articleUserId']
    # print(data)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        data['articleUserId'],
        {
            'type': 'share_message',
            'message': data['message'],
            'articleId': data['articleId'],
            'articleUserId': data['articleUserId'],
            'thumbnailPath': data['thumbnailPath'],
            'alarmType': data['alarmType'],
            'username': data['username'],
            'accept': True
        }
    )
    return HttpResponse()

@api_view(['GET', 'POST', 'DELETE'])
def alarm(request, user_pk):
    if request.user.pk == user_pk:
        if request.method == 'GET':
            alarms = Alarm.objects.filter(articleUserId=user_pk)
            serializer = AlarmSerializser(alarms, many=True)
        elif request.method == 'POST':
            alarms = Alarm.objects.filter(articleUserId=user_pk)
            for alarm in alarms:
                alarm.isFetch = True
                alarm.save()
            serializer = AlarmSerializser(alarms, many=True)
        else:
            alarm = Alarm.objects.filter(articleUserId=user_pk)
            if len(alarm):
                alarm.delete()
                return Response({'message': '정상적으로 삭제되었습니다.'})
            else:
                return Response({'message': '남은 알림이 없습니다.'})
        return Response(serializer.data)
    else:
        return Response({'message': '권한이 없습니다.'})

@api_view(['GET'])
def chat(requset, room_pk):
    chats = Chat.objects.filter(roomId=room_pk).order_by('-pk')[:100]
    serializer = ChatSerializer(chats[::-1], many=True)
    return Response(serializer.data)
    
