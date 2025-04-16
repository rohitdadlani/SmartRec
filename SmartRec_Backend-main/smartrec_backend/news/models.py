from django.db import models

from django.db import models

class NewsArticle(models.Model):
    """Stores full news articles in PostgreSQL"""
    title = models.TextField()
    category = models.TextField(db_index=True)
    source = models.TextField()
    author = models.TextField(blank=True, null=True)
    published_at = models.DateTimeField(db_index=True)
    url = models.TextField(unique=True)  # ✅ Use TextField to prevent truncation
    url_to_image = models.TextField(blank=True, null=True)  # ✅ Same for image URLs
    content = models.TextField(blank=True, null=True)  # Full article content

    class Meta:
        db_table = "news_articles"
        indexes = [
            models.Index(fields=["category", "published_at"]),  # ✅ Faster filtering & sorting
        ]

