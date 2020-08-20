from channels.generic.websocket import WebsocketConsumer
import json
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from .models import Chat

# @receiver(post_save, sender=Alarm)
# def announce_likes(sender, instance, created, **kwargs):
#     if created:
#         channel_layer=get_channel_layer()
#         async_to_sync(channel_layer.group_send)(
#             "shares", {
#                 "type": "share_message",
#                 "message": instance.message,
#             }
#     )


class UserTestConsumer(WebsocketConsumer):
    def connect(self):
        self.groupname = str(self.scope["user"].pk)
        print(str(self.scope["user"].pk))
        # self.groupname="shares"
        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            self.groupname,
            self.channel_name
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.groupname,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # async_to_sync(self.channel_layer.group_send)(
        #     self.groupname,
        #     {
        #         'type': 'share_message',
        #         'message': message
        #     }
        # )

    # Receive message from room group
    def share_message(self, event):
        print("event={}".format(event))

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': event['message'],
            'articleId': event['articleId'],
            'articleUserId': event['articleUserId'],
            'thumbnailPath': event['thumbnailPath'],
            'alarmType': event['alarmType'],
            'username': event['username'],
        }))

class UserChatConsumer(WebsocketConsumer):
    def connect(self):
        self.groupname = self.scope['path'].split('/')[4]
        print(self.scope['path'].split('/')[4])
        self.accept()

        async_to_sync(self.channel_layer.group_add)(
            self.groupname,
            self.channel_name
        )

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.groupname,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        profileImage = text_data_json['profileImage']
        choice = text_data_json['choice']
        roomId = self.groupname.split('_')[1]

        chat = Chat(message=message, username=username, roomId=roomId, profileImage=profileImage, choice=choice)
        chat.save()
        
        async_to_sync(self.channel_layer.group_send)(
            self.groupname,
            {
                'type': 'share_chat_message',
                'message': message,
                'username': username,
                'profileImage': profileImage,
                'choice': choice
            }
        )

    # Receive message from room group
    def share_chat_message(self, event):
        # print("event={}".format(event))

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': event['message'],
            'username': event['username'],
            'profileImage': event['profileImage'],
            'choice': event['choice']
        }))