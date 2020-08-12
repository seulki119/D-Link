from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404, redirect
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework import generics  
from rest_framework.authtoken.models import Token
from .serializers import ChangePasswordSerializer
from .serializers import UserSerializer, UserTasteSerializer, UserUpdateSerializer, UserImageUpdateSerializer, UserSimpleSerializer
from pprint import pprint
import requests
from .models import User as AUTH_USER
# Create your views here.

@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def mypage(request, username):
    if request.method == 'POST':
        serializer = UserSerializer(request.user)
    elif request.method == 'PUT':
        serializer = UserUpdateSerializer(data=request.data, instance=request.user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
    else:
        request.user.delete()
        return Response({'message': '성공적으로 삭제되었습니다.'})
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
@authentication_classes([])
@permission_classes([])
def email_duplicated(request):
    User = get_user_model()
    try:
        user = User.objects.get(email=request.data.get('email'))
        return Response({'message': '이미 존재하는 이메일입니다.'})
    except:
        return Response({'message': '사용가능한 이메일입니다.'})

@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def username_duplicated(request):
    User = get_user_model()
    try:
        user = User.objects.get(username=request.data.get('username'))
        return Response({'message': '이미 존재하는 닉네임입니다.'})
    except:
        return Response({'message': '사용가능한 닉네임입니다.'})

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login(request):
    client_id = '122178100323-91dhrvqu6bm14umnnovogcud8upb4c71.apps.googleusercontent.com'
    client_secret = 'JtzU7cxkgQBZoQcecf_DOeH9'
    code = request.data.get('code')
    scope = 'https://www.googleapis.com/auth/spreadsheets'
    # access_token 발급
    token_request = requests.post(
        "https://oauth2.googleapis.com/token?code={}&redirect_uri=postmessage&client_id={}&client_secret={}&scope={}&grant_type=authorization_code".format(code, client_id, client_secret, scope)
    )
    # pprint(token_request)
    token_response_json = token_request.json()
    # error = token_response_json.get("error", None)
    # pprint(token_response_json)
    access_token = token_response_json.get('access_token')
    # 프로필 가져오기
    profile_request = requests.get(
        "https://www.googleapis.com/userinfo/v2/me?access_token={}".format(access_token),
    )
    # pprint(profile_request)
    profile_response_json = profile_request.json()
    # pprint(profile_response_json)

    email = profile_response_json.get('email')
    username = profile_response_json.get('name')
    last_name = profile_response_json.get('family_name')
    first_name = profile_response_json.get('given_name')
    User = get_user_model()
    # username 유니크화
    if User.objects.filter(username=username).exists():
        username = email.split('@')[0]

    try:
        user_in_db = User.objects.get(email=email)
        token = Token.objects.get(user_id=user_in_db.pk)
        # 소셜유저인지 이메일유저인지 확인하는 절차 추가해야함
    except User.DoesNotExist:
        new_user_to_db = User.objects.create(
            email=email,
            username=username,
            last_name=last_name,
            first_name=first_name,
        )
        new_user_to_db.set_unusable_password()
        new_user_to_db.save()
        token = Token.objects.create(user=new_user_to_db)         
    return Response({"key": "{}".format(token.key)})

@api_view(['POST'])
@permission_classes([AllowAny])
def kakao_login(request):
    print(request.data)
    token = request.data.get('token')
    client_id = '9cfba8540e8773ea57ed53176934209d'
    redirect_uri = request.data.get('redirect_uri')

    params='property_keys=["kakao_account.email", "kakao_account.profile"]'
    headers={
        "Authorization": "Bearer "+token,
        "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
    }

    profile_request = requests.post("https://kapi.kakao.com/v2/user/me", headers=headers, data=params)
    kakao_account_json = profile_request.json().get('kakao_account')
    # pprint(kakao_account_json)

    email = kakao_account_json.get('email')
    username = kakao_account_json.get('profile').get('nickname')
    User = get_user_model()
    # username 유니크화
    if User.objects.filter(username=username).exists():
        username = email.split('@')[0]
    try:
        user_in_db = User.objects.get(email=email)
        token = Token.objects.get(user_id=user_in_db.pk)
        # 소셜유저인지 이메일유저인지 확인하는 절차 추가해야함
    except User.DoesNotExist:
        new_user_to_db = User.objects.create(
            email=email,
            username=username,
        )
        new_user_to_db.set_unusable_password()
        new_user_to_db.save()
        token = Token.objects.create(user=new_user_to_db)         
    return Response({"key": "{}".format(token.key)})

def kakao_callback(request):
    print(request.data)
    return Response(request.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def image_update(request, username):
    serializer = UserImageUpdateSerializer(data=request.data, instance=request.user)
    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def user_info(request):
    serializer = UserSimpleSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def emailpw(request, email_value):
    # print(email_value)
    models =  AUTH_USER.objects.all()
    token_pk =- 1
    if  AUTH_USER.objects.filter(email=email_value).exists():
        token_pk = AUTH_USER.objects.filter(email=email_value)[0].id
        token_user = Token.objects.filter(user_id=token_pk)[0].key
        print(token_user)
        return Response(token_user)
    else :
        return Response('가입하지 않은 회원입니다')


   