from rest_framework import serializers
from products.models import Product
from .models import Order, OrderItem, PostalAddress
from products.serializers import ProductFieldSerializer


class OrderItemSerializer(serializers.Serializer):
    qty = serializers.IntegerField(min_value=1, default=1)
    product = ProductFieldSerializer(queryset=Product.objects.all())
    productPriceAtPurchase = serializers.DecimalField(
        source="product_price_at_purchase",
        read_only=True,
        max_digits=6,
        decimal_places=2,
    )


class PostalAddressSerializer(serializers.Serializer):
    address = serializers.CharField(max_length=255)
    postalCode = serializers.CharField(source="postal_code", max_length=7)
    city = serializers.CharField(max_length=63)
    country = serializers.CharField(max_length=63)


class OrderSerializer(serializers.Serializer):
    pk = serializers.UUIDField(source="id", read_only=True)
    createdOn = serializers.DateTimeField(source="created_on", read_only=True)
    orderStatus = serializers.CharField(
        read_only=True, source="get_order_status_display"
    )
    amountPaid = serializers.DecimalField(
        source="amount_paid", read_only=True, max_digits=6, decimal_places=2
    )
    paymentStatus = serializers.CharField(
        source="get_payment_status_display", read_only=True
    )
    totalPrice = serializers.DecimalField(
        source="get_total_price", read_only=True, max_digits=6, decimal_places=2
    )
    shippingPrice = serializers.DecimalField(
        source="get_shipping_price", read_only=True, max_digits=6, decimal_places=2
    )
    items = OrderItemSerializer(many=True)
    postalAddress = PostalAddressSerializer(source="postal_address")

    def create(self, validated_data):
        user = self.context.get("request").user
        order = Order(submitted_by=user)
        order.save()
        PostalAddress.objects.create(order=order, **validated_data["postal_address"])
        for item in validated_data["items"]:
            OrderItem.objects.create(order=order, **item)
        order.save()
        return order
