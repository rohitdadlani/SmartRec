

from django.db import models

class Event(models.Model):
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    venue = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    url = models.URLField()
    

    def __str__(self):
        return f"{self.name} @ {self.venue}"
