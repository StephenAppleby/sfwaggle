# Generated by Django 4.0.6 on 2022-10-29 00:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0002_cartitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('amount_paid', models.DecimalField(decimal_places=2, default=0, max_digits=6)),
                ('payment_status', models.CharField(choices=[('NP', 'nothing payed'), ('PP', 'partially payed'), ('FP', 'fully payed')], default='NP', max_length=2)),
                ('order_status', models.CharField(choices=[('PE', 'pending'), ('CO', 'confirmed'), ('PR', 'preparing for delivery'), ('OD', 'on delivery'), ('DE', 'delivered')], default='PE', max_length=2)),
                ('submitted_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PostalAddress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('postal_code', models.CharField(max_length=7)),
                ('city', models.CharField(max_length=63)),
                ('country', models.CharField(max_length=63)),
                ('order', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postal_address', to='transactions.order')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qty', models.PositiveIntegerField(blank=True, default=1)),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('product_price_at_purchase', models.DecimalField(blank=True, decimal_places=2, max_digits=6)),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='transactions.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.product')),
            ],
        ),
    ]
