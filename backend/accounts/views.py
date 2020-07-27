from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, UserTasteSerializer
from rest_framework import status
from rest_framework import generics
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .serializers import ChangePasswordSerializer
from django.shortcuts import get_object_or_404  

# Create your views here.

@api_view(['POST'])
def mypage(request, username): 
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
    
class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def taste(request):
    serializer = UserTasteSerializer(data=request.data, instance=request.user)
    print(request.data.get('taste2'))
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response({'message': '성공적으로 등록되었습니다.'})
    else:
        return Response({'message': '유효하지 않은 입력입니다.'})

@api_view(['POST'])
def email_duplicated(request):
    User = get_user_model()
    try:
        user = User.objects.get(email=request.data.get('email'))
        return Response({'message': '이미 존재하는 이메일입니다.'})
    except:
        return Response({'message': '사용가능한 이메일입니다.'})

@api_view(['POST'])
def username_duplicated(request):
    User = get_user_model()
    try:
        user = User.objects.get(username=request.data.get('username'))
        return Response({'message': '이미 존재하는 닉네임입니다.'})
    except:
        return Response({'message': '사용가능한 닉네임입니다.'})