from django.contrib.auth import get_user_model
from .models import CartItem, Product, Review
from rest_framework import serializers


class UserFieldSerializer(serializers.PrimaryKeyRelatedField):
    def to_representation(self, value):
        user = get_user_model().objects.get(id=value.pk)
        username = str(user).split("@")[0]
        return username


class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.IntegerField(min_value=0, max_value=5)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    user = UserFieldSerializer(read_only=True)

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    class Meta:
        model = Review
        fields = ["body", "rating", "product", "user"]


class ProductSerializer(serializers.ModelSerializer):
    countInStock = serializers.IntegerField(source="count_in_stock")
    rating = serializers.DecimalField(
        source="get_rating", max_digits=2, decimal_places=1
    )
    reviews = ReviewSerializer(many=True)
    brand = serializers.StringRelatedField()
    category = serializers.StringRelatedField()

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
            "rating",
            "reviews",
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
