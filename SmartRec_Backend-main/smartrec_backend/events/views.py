from django.http import JsonResponse
from .ticketmaster import fetch_events_by_city

def get_events(request):
    city = request.GET.get('city', 'San Francisco')
    events = fetch_events_by_city(city)
    return JsonResponse(events, safe=False)




from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from .models import Event
from .serializers import EventSerializer

class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)



from datetime import datetime, timedelta
import requests
from django.http import JsonResponse


def fetch_top_10_events_la_next_week():
    api_key = 'rzjKcwMPVei76tiMc2RH6a5MHGXD4YEn'
    base_url = 'https://app.ticketmaster.com/discovery/v2/events.json'

    # Calculate next week's Monday and Sunday
    today = datetime.utcnow()
    days_until_next_monday = 7 - today.weekday()  # Monday is 0
    next_monday = today + timedelta(days=days_until_next_monday)
    next_sunday = next_monday + timedelta(days=6)

    start_date = next_monday.strftime('%Y-%m-%dT00:00:00Z')
    end_date = next_sunday.strftime('%Y-%m-%dT23:59:59Z')

    params = {
        'apikey': api_key,
        'city': 'Los Angeles',
        'size': 10,
        'startDateTime': start_date,
        'endDateTime': end_date,
        'sort': 'date,asc'
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    events = []
    for event in data.get('_embedded', {}).get('events', []):
        events.append({
            'name': event.get('name'),
            'start_time': event.get('dates', {}).get('start', {}).get('dateTime'),
            'venue': event.get('_embedded', {}).get('venues', [{}])[0].get('name'),
            'url': event.get('url'),
        })

    return events


def events_next_week_view(request):
    fetch_and_save_events_la_next_week()
    events = Event.objects.filter(city='Los Angeles').order_by('start_time')[:10]
    data = [
        {
            'name': e.name,
            'start_time': e.start_time,
            'venue': e.venue,
            'url': e.url,
        } for e in events
    ]
    return JsonResponse(data, safe=False)




from .models import Event

def fetch_and_save_events_la_next_week():
    # (same API call logic as before)

    # Clear old saved events (optional, or make smarter deduping later)
    Event.objects.filter(city='Los Angeles').delete()

    for event in data.get('_embedded', {}).get('events', []):
        Event.objects.create(
            name=event.get('name'),
            start_time=event.get('dates', {}).get('start', {}).get('dateTime'),
            venue=event.get('_embedded', {}).get('venues', [{}])[0].get('name'),
            city='Los Angeles',
            url=event.get('url'),
        )
