from rest_framework import serializers
from .models import Dog


class DogSerializer(serializers.ModelSerializer):
    forSale = serializers.BooleanField(source="for_sale")

    class Meta:
        model = Dog
        fields = [
            "pk",
            "name",
            "image",
            "description",
            "forSale",
            "price",
            "posted",
            "floofs",
        ]
