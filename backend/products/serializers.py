from .models import CartItem, Product
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    countInStock = serializers.IntegerField(source="count_in_stock")

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
            "countInStock",
        ]


class ProductFieldSerializer(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        product = Product.objects.get(id=value.pk)
        serializer = ProductSerializer(product)
        return serializer.data


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductFieldSerializer(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ["product", "qty"]

    def validate_product(self, value):
        cart_items = self.context.get("request").user.cart_items.all()
        if value in [cart_item.product for cart_item in cart_items]:
            raise serializers.ValidationError(f"{str(value)} already in cart")
        return value
