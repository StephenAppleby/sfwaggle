# Generated by Django 4.0.6 on 2022-10-24 04:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('transactions', '0005_remove_order_postal_address_postaladdress_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='submitted_by',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]