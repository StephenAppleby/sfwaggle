from django.db import models
from products.models import Product
from django.conf import settings


class Order(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    amount_paid = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="orders",
    )

    PAYMENT_STATUS_CHOICES = [
        ("NP", "nothing payed"),
        ("PP", "partially payed"),
        ("FP", "fully payed"),
    ]
    payment_status = models.CharField(
        max_length=2, choices=PAYMENT_STATUS_CHOICES, default="NP"
    )

    ORDER_STATUS_CHOICES = [
        ("PE", "pending"),
        ("CO", "confirmed"),
        ("PR", "preparing for delivery"),
        ("OD", "on delivery"),
        ("DE", "delivered"),
    ]
    order_status = models.CharField(
        max_length=2, choices=ORDER_STATUS_CHOICES, default="PE"
    )

    def __str__(self):
        item_names = [str(item) for item in self.items.all()]
        return "\n".join(item_names)

    def get_items_price(self):
        return sum([item.get_item_price() for item in self.items.all()])

    def get_shipping_price(self):
        return 0 if self.get_items_price() > 100 else 12

    def get_total_price(self):
        return self.get_items_price() + self.get_shipping_price()


class PostalAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=7)
    city = models.CharField(max_length=63)
    country = models.CharField(max_length=63)

    def __str__(self):
        return (
            f"Address: {self.address}\n"
            f"Postal code: {self.postal_code}\n"
            f"City: {self.city}\n"
            f"Country: {self.country}"
        )


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="items",
    )
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    qty = models.PositiveIntegerField(default=1, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    product_price_at_purchase = models.DecimalField(
        max_digits=6, decimal_places=2, blank=True
    )

    def __str__(self):
        return f"{self.qty} x {self.product.name}"

    def get_item_price(self):
        return self.product_price_at_purchase * self.qty

    def save(self, *args, **kwargs):
        self.product_price_at_purchase = self.product.price
        super().save(*args, **kwargs)
