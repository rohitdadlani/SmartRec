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

