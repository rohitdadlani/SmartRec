
from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    venue = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    ticket_url = models.URLField()

    def __str__(self):
        return self.name
