from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Article, Hashtag
from .serializers import ArticleSerializer, ArticleListSerializer, ArticleCreateSerializer, ArticleScrapSerializer, CommentSerializer, HashtagSerializser
import os
from django.conf import settings

# Create your views here.

@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    else:
        serializer = ArticleCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            article = serializer.save(user=request.user)
            hashtags = request.data.get('hashtag')
            for hashtag in hashtags.split('#'):
                if hashtag:
                    try:
                        exist_tag = Hashtag.objects.get(tag=hashtag)
                        article.hashtag.add(exist_tag)
                    except:
                        new_tag = Hashtag(tag=hashtag)
                        new_tag.save()
                        article.hashtag.add(new_tag)
            return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def detail(request, article_pk):
    IMG_ROOT = os.path.join(settings.BASE_DIR,'movies','media')

    if request.method == 'GET':
        article = get_object_or_404(Article, pk=article_pk)
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == "PUT":
            serializer = ArticleSerializer(data=request.data, instance=article)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        else:
            article.delete()
            return Response({'message': '성공적으로 삭제되었습니다'})
    else:
        return Response({'message': '글쓴이가 아닙니다'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def scrap(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        return Response({'message': '본인의 글은 스크랩할 수 없습니다.'})
        
    if article.scrap.filter(pk=request.user.pk).exists():
        article.scrap.remove(request.user)
    else:
        article.scrap.add(request.user)
    serializer = ArticleScrapSerializer(article)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])    
def comment_create(request, article_pk):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user, article_id=article_pk)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])    
def comment_ud(request, article_pk, comment_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comments = article.comment_set.all()
    comment = comments.get(pk=comment_pk)
    if request.user == comment.user:
        serializer = CommentSerializer(data=request.data, instance=comment)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            comment.delete()
            return Response({'message': "성공적으로 삭제되었습니다"})
    else:
        return Response({'message': '글쓴이가 아닙니다'})

@api_view(['POST'])
def hashtag(request):
    hashtag = Hashtag.objects.all()
    serializer = HashtagSerializser(hashtag, many=True)
    return Response(serializer.data)
