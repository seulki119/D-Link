# Generated by Django 2.2.14 on 2020-08-12 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('alarms', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='alarm',
            name='isFetch',
            field=models.BooleanField(default=False),
        ),
    ]
