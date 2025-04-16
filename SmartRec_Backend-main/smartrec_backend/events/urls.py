from django.urls import path
from .views import get_events,EventList

urlpatterns = [
    path('api/events/', EventList.as_view(), name='event-list'),
    path('events/', get_events, name='get_events'),
]

