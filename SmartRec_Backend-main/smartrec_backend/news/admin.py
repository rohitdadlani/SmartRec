from django.contrib import admin
from .models import NewsArticle


@admin.register(NewsArticle)
class NewsMetadataAdmin(admin.ModelAdmin):
    """Admin panel configuration for News Metadata"""

    list_display = ("title", "category", "source", "published_at")  # ✅ Show these fields in the list view
    list_filter = ("category", "source", "published_at")  # ✅ Enable filters
    search_fields = ("title", "source", "url")  # ✅ Enable search by title, source, and URL
    ordering = ("-published_at",)  # ✅ Order by latest published date
    readonly_fields = ("published_at",)  # ✅ Make published date non-editable
