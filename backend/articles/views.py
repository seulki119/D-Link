from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Article
from .serializers import ArticleSerializer, ArticleListSerializer, ArticleCreateSerializer, ArticleScrapSerializer

# Create your views here.

@api_view(['GET'])
def index(request):
    articles = Article.objects.all()
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    serializer = ArticleCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data)

@api_view(['GET'])
def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_delete(request, article_pk):
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
    