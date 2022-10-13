import uuid
from django.db import models


class Brand(models.Model):
    name = models.TextField(max_length=255)

    def __str__(self):
        return str(self.name)


class Category(models.Model):
    name = models.TextField(max_length=255)

    def __str__(self):
        return str(self.name)


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.TextField(max_length=255)
    image = models.ImageField(upload_to="product_images/", blank=True)
    description = models.TextField(max_length=1023)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    count_in_stock = models.PositiveSmallIntegerField()
    # rating and numReviews can be calculated programatically once we implement reviews

    def __str__(self):
        return str(self.name)


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1, blank=True)

    def __str__(self):
        return str(self.product.name)
