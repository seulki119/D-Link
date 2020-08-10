# from channels.routing import ProtocolTypeRouter, URLRouter
# import alarms.routing
# application = ProtocolTypeRouter({
#     # (http->django views is added by default)
#     'websocket': URLRouter(
#             alarms.routing.websocket_urlpatterns
#         )
# })

from alarms import consumers 
from django.conf.urls import url
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import re_path

from token_auth import TokenAuthMiddlewareStack

application = ProtocolTypeRouter({

    "websocket": TokenAuthMiddlewareStack(
        URLRouter([
            re_path(r'ws/test/', consumers.UserTestConsumer),
        ])
    ),

})