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
from .serializers import UserSerializer, UserTasteSerializer, UserUpdateSerializer, ResetPasswordEmailRequestSerializer, SetNewPasswordSerializer
from pprint import pprint
import requests



from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
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
    profile_img = profile_response_json.get('picture')
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
            image=profile_img,
            last_name=last_name,
            first_name=first_name,
        )
        new_user_to_db.set_unusable_password()
        new_user_to_db.save()
        token = Token.objects.create(user=new_user_to_db)         
    return Response({"key": "{}".format(token.key)})


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data['email']

        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativeLink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absurl = 'http://'+current_site + relativeLink
            email_body = 'Hello, \n Use link below to reset your password  \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passsword'}
            Util.send_email(data)
        return Response({'success': 'We have sent you a link to reset your password'}, status=status.HTTP_200_OK)    

