from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsViewSet

# ✅ Register News API Endpoints using Django Rest Framework Router
router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')

urlpatterns = [
    path('', include(router.urls)),  # ✅ Include all ViewSet routes
]
