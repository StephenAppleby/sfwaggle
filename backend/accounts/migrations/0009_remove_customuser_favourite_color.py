# Generated by Django 4.0.6 on 2022-10-31 00:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_customuser_cart_items'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='favourite_color',
        ),
    ]