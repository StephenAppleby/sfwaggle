# Generated by Django 4.0.6 on 2022-10-23 01:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0002_alter_orderitem_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='amount_paid',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=6),
        ),
        migrations.AddField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('PE', 'pending'), ('CO', 'confirmed'), ('PR', 'preparing for delivery'), ('OD', 'on delivery'), ('DE', 'delivered')], default='PE', max_length=2),
        ),
        migrations.AddField(
            model_name='order',
            name='payment_status',
            field=models.CharField(choices=[('NP', 'nothing payed'), ('PP', 'partially payed'), ('FP', 'fully payed')], default='NP', max_length=2),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='transactions.order'),
        ),
    ]