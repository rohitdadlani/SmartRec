from django.urls import path
from .views import get_events,EventList
from .views import events_next_week_view

urlpatterns = [
    path('api/events/', EventList.as_view(), name='event-list'),
    path('events/', get_events, name='get_events'),
    path('events/next-week/', events_next_week_view, name='events_next_week'),
]

