# Generated by Django 4.0.6 on 2022-10-27 05:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0007_alter_order_submitted_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postaladdress',
            name='order',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postal_address', to='transactions.order'),
        ),
    ]
