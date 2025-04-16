from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils.timezone import make_aware
from django.utils.dateparse import parse_datetime
from datetime import datetime
from .models import NewsArticle
from .serializers import NewsArticleSerializer
import requests

# ✅ NewsAPI URL (Replace with your API Key)
NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2e67c6b83ed8402ebc2b74def89821dd"

def fetch_and_store_news():
    """Fetch news from NewsAPI and store in PostgreSQL"""
    response = requests.get(NEWS_API_URL)
    data = response.json()

    if data["status"] != "ok":
        return {"error": "Failed to fetch news"}

    saved_articles = 0
    skipped_articles = 0

    for article in data["articles"]:
        title = article["title"]
        url = article["url"]
        content = article.get("content", "")
        published_at = article.get("publishedAt", None)
        author = article.get("author", None)
        category = "Trending"  # NewsAPI does not provide category
        source = article["source"]["name"]
        url_to_image = article.get("urlToImage", None)

        # ✅ Convert `published_at` to Django timezone format
        if published_at:
            published_at = make_aware(datetime.strptime(published_at, "%Y-%m-%dT%H:%M:%SZ"))

        # ✅ Check if article already exists in the DB (Avoid duplicates)
        if NewsArticle.objects.filter(url=url).exists():
            skipped_articles += 1
            continue

        # ✅ Save new article to PostgreSQL
        NewsArticle.objects.create(
            title=title,
            category=category,
            source=source,
            author=author,
            published_at=published_at,
            url=url,
            url_to_image=url_to_image,
            content=content
        )
        saved_articles += 1

    return {"saved_articles": saved_articles, "skipped_articles": skipped_articles}


class NewsViewSet(viewsets.ModelViewSet):
    """API Endpoints for fetching news articles from DB"""
    queryset = NewsArticle.objects.all().order_by('-published_at')
    serializer_class = NewsArticleSerializer

    def list(self, request):
        """Fetch all news from the database with optional filtering"""
        queryset = NewsArticle.objects.all().order_by('-published_at')

        # ✅ Filtering by category (Optional)
        category = request.query_params.get("category")
        if category:
            queryset = queryset.filter(category__iexact=category)

        # ✅ Filtering by date range
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        if start_date and end_date:
            queryset = queryset.filter(published_at__range=[start_date, end_date])

        # ✅ Serialize response
        serializer = NewsArticleSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        """Fetch a single news article from the database"""
        try:
            article = NewsArticle.objects.get(id=pk)
            serializer = NewsArticleSerializer(article)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except NewsArticle.DoesNotExist:
            return Response({"error": "News article not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=["post"])
    def fetch_news(self, request):
        """Fetch latest news from NewsAPI and store it in the database"""
        result = fetch_and_store_news()
        return Response({
            "message": "News fetched successfully!",
            **result
        }, status=status.HTTP_200_OK)
