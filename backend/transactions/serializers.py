from rest_framework import serializers
from products.models import Product
from .models import Order, OrderItem, PostalAddress
from products.serializers import ProductFieldSerializer


class OrderItemSerializer(serializers.Serializer):
    qty = serializers.IntegerField(min_value=1, default=1)
    product = ProductFieldSerializer(queryset=Product.objects.all())
    product_price_at_purchase = serializers.DecimalField(
        read_only=True, max_digits=6, decimal_places=2
    )


class PostalAddressSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=255)
    postal_code = serializers.CharField(max_length=7)
    city = serializers.CharField(max_length=63)
    country = serializers.CharField(max_length=63)


class OrderSerializer(serializers.Serializer):
    items = OrderItemSerializer(many=True)
    postal_address = PostalAddressSerializer()
    id = serializers.UUIDField(read_only=True)

    def create(self, validated_data):
        user = self.context.get("request").user
        order = Order(submitted_by=user)
        order.save()
        PostalAddress.objects.create(order=order, **validated_data["postal_address"])
        for item in validated_data["items"]:
            OrderItem.objects.create(order=order, **item)
        order.save()
        return order
