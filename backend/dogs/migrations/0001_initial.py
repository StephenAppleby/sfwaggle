# Generated by Django 4.0.6 on 2022-10-31 00:40

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dog',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=63)),
                ('image', models.ImageField(blank=True, upload_to='dog_images/')),
                ('description', models.TextField(max_length=1023)),
                ('for_sale', models.BooleanField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('posted', models.DateTimeField(auto_now_add=True)),
                ('floofs', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
