from .models import Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "pk",
            "name",
            "image",
            "description",
            "brand",
            "category",
            "price",
            "count_in_stock",
        ]
