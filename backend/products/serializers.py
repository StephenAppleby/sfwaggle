from .models import CartItem, Product
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


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["product", "qty"]

    def validate_product(self, value):
        cart_items = self.context.get("request").user.cart_items.all()
        if value in [cart_item.product for cart_item in cart_items]:
            raise serializers.ValidationError(f"{str(value)} already in cart")
        return value
