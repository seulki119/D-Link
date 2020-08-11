from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



import os
from django.conf import settings



from .models import Topic, VS_Comment
from .serializers import TopicSerializer, VS_CommentCommentSerializer


@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        topics = Topic.objects.all()
        serializer = TopicSerializer(topics, many=True)
    else:
        # 관리자 로직추가
        if request.user.is_staff:
            serializer = TopicSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
        else:
            return Response({"message": "관리자가 아닙니다."})
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def detail(request, topic_pk):
    # 인덴트 두번 띄워져이씀
    topic = get_object_or_404(Topic, pk=topic_pk)  
    if request.method == 'GET':  
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

    # 어떤 경우에든 Response해주어야함
    if request.user == topic.user:
        # 현재 versus_vs_comment 테이블이 안만들어져서 동작안함 -> 확인해보셔야할듯
        if request.method == 'DELETE':
            if request.user == topic.user:
                topic.delete()
                return Response({'message':'성공적으로 삭제'})
        else:
            if request.user == topic.user:
                serializer = TopicSerializer(data=request.data, instance=topic)
                if serializer.is_valid(raise_exception=True):
                    serializer.save(user=request.user)
                    return Response({'message':'성공적으로 수정'})
    else:
        return Response({'message': '권한이 없습니다.'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vote(request, topic_pk):
    select = request.data.get('select')
    topic = get_object_or_404(Topic, pk=topic_pk)  
    # vote = get_object_or_404(Vote, pk=topic_pk) 
    
    if select == 'A':
        if topic.select_B.filter(pk=request.user.pk).exists():
            message = '이미 반대쪽에 투표하셨습니다'
            return Response(message)
        else:
            if topic.select_A.filter(pk=request.user.pk).exists():
                topic.select_A.remove(request.user)
            else:
                topic.select_A.add(request.user)
    
    else :
        if topic.select_A.filter(pk=request.user.pk).exists():
            message = '이미 반대쪽에 투표하셨습니다'
            return Response(message)
        else:
            if topic.select_B.filter(pk=request.user.pk).exists():
                topic.select_B.remove(request.user)
            else:
                topic.select_B.add(request.user)    
    serializer = TopicSerializer(topic)
    res_a = len(serializer.data['select_A'])
    res_b = len(serializer.data['select_B'])
    return Response(serializer.data)
    
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment(request, topic_pk):
        serializer = VS_CommentCommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, topic_id=topic_pk)
            return Response(serializer.data)    


 
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def comment_delete(request, topic_pk , comment_pk):
        print('들어오는오지')
        topic = get_object_or_404(Topic, pk=topic_pk)
        # print(topic)
        # comments = topic.comment_set.all()
        print('들어오지 2')
        comment = get_object_or_404(VS_Comment, pk=comment_pk)
        print('들어오지 3')
        if request.user == comment.user or request.user == topic.user:             
            comment.delete()
            return Response({'message': "성공적으로 삭제되었습니다"})
        else:
            return Response({'message': '권한이 없습니다.'})
         