from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer


# Create your views here.

@api_view(['POST'])
def mypage(request, username): 
    serializer = UserSerializer(request.user)
    return Response(serializer.data)