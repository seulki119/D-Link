from django.views.generic import TemplateView
from . import models
import json
from django.shortcuts import HttpResponse
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .consumers import UserTestConsumer
class Alarm(TemplateView):
    template_name = "alarms/alarm.html"

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data()
        context['username'] = self.request.user.username

        return context


# class ShareMe(TemplateView):
#     template_name = "alarms/ShareMe.html"

#     def get_context_data(self, **kwargs):
#         context=super(TemplateView, self).get_context_data()
#         context['username']=self.request.user.username

#         return context

#     def post(self, request, **kwargs):
#         ins=models.Alarm()
#         data_unicode=request.body.decode('utf-8')
#         data=json.loads(data_unicode)
#         ins.message=data['message']
#         ins.save()

#         return HttpResponse('')

def ShareMe(request):
    data_unicode=request.body.decode('utf-8')
    data=json.loads(data_unicode)
    print(data)

    alarm = models.Alarm()
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
    # return HttpResponse(request.body)