# Generated by Django 4.2 on 2025-04-16 05:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='start_date',
            new_name='start_time',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='ticket_url',
            new_name='url',
        ),
    ]
