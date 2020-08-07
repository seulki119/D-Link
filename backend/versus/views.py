from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated



import os
from django.conf import settings



from .models import Topic, VS_Comment, Vote
from .serializers import TopicSerializer, VS_CommentCommentSerializer, VoteSerializer


@api_view(['GET'])
def index(request):
    if request.method == 'GET':
        topic = Topic.objects.all()
        serializer = TopicSerializer(articles, many=True)
        return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data)


@api_view(['GET'])
def detail(request,topic_pk):
        topic = get_object_or_404(Topic, pk=topic_pk)    
        serializer = TopicSerializer(topic)
        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete(request, topic_pk):
    topic = get_object_or_404(Topic, pk=topic_pk) 
    if request.user == topic.user:
        topic.delete()
        return Response({'message':'성공적으로 삭제'})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request, topic_pk):
    topic = get_object_or_404(Topic, pk=topic_pk)    
    if request.user == topic.user:
        serializer = TopicSerializer(data=request.data, instance=topic)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response({'message':'성공적으로 수정'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def vote(request, topic_pk):
    select = request.data.get('select')
    vote = get_object_or_404(Vote, pk=topic_pk)    
    if select == 'A':
        if vote.select_A.filter(pk=request.user.pk).exists():
            vote.select_A.remove(request.user)
        else:
            vote.select_A.add(request.user)
    
    else :
        if vote.select_B.filter(pk=request.user.pk).exists():
            vote.select_B.remove(request.user)
        else:
            vote.select_B.add(request.user)    

    serializer = VoteSerializer(vote)
    return Response(serializer.data)    
    

 


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comment(request, topic_pk):
        serializer = VoteCommentSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user, topic_id=topic_pk)
            return Response(serializer.data)    