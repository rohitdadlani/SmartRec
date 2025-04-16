import requests

API_KEY = 'rzjKcwMPVei76tiMc2RH6a5MHGXD4YEn'
BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'

def fetch_events_by_city(city):
    params = {
        'apikey': API_KEY,
        'city': city,
        'size': 10  # limit results
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    events = []
    for event in data.get('_embedded', {}).get('events', []):
        events.append({
            'name': event.get('name'),
            'city': city,
            'venue': event.get('_embedded', {}).get('venues', [{}])[0].get('name'),
            'start_date': event.get('dates', {}).get('start', {}).get('dateTime'),
            'ticket_url': event.get('url'),
        })
    return events
