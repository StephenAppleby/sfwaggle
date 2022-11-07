from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import CartItem, Product, Review
from .serializers import CartItemSerializer, ProductSerializer, ReviewSerializer
from rest_framework import status


class ProductListView(APIView):
    def get(self, request):
        serializer = ProductSerializer(Product.objects.all(), many=True)
        return Response(serializer.data)


class ProductView(APIView):
    def get(self, request, pk=None):
        try:
            serializer = ProductSerializer(Product.objects.get(pk=pk))
            return Response(serializer.data)
        except Product.DoesNotExist as e:
            raise Http404(e)


class ReviewView(APIView):
    def post(self, request):
        product = Product.objects.get(pk=request.data["product"])
        if product not in request.user.get_products_eligible_for_review():
            raise ValidationError(
                "You are not eligible to review this product. "
                "Only users who have purchased products may review them."
            )
        serializer = ReviewSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
            return Response("Review submitted", status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def patch(self, request):
        product = Product.objects.get(pk=request.data["product"])
        review = Review.objects.get(user=request.user, product=product)
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Review updated", status=status.HTTP_200_OK)
        else:
            raise ValidationError(serializer.errors)

    def delete(self, request):
        try:
            product = Product.objects.get(pk=request.data["product"])
            review = Review.objects.get(user=request.user, product=product)
            review.delete()
            return Response("Review deleted", status=status.HTTP_200_OK)
        except Review.DoesNotExist as e:
            raise ValidationError(e)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CartItemSerializer(
            data=request.data,
            context={"request": request},
        )
        if serializer.is_valid():
            serializer.save()
            request.user.cart_items.add(serializer.instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            raise ValidationError(serializer.errors)

    def get(self, request):
        cart_items = request.user.cart_items.all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        try:
            product = Product.objects.get(id=request.data["product"])
            cart_item = request.user.cart_items.get(product=product)
            serializer = CartItemSerializer(
                cart_item, data={"qty": request.data["qty"]}, partial=True
            )
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            raise serializers.ValidationError(f"{e} not provided")
        except Product.DoesNotExist:
            raise serializers.ValidationError("Bad product uuid")
        except CartItem.DoesNotExist:
            raise Http404("Product is not in cart")

    def delete(self, request):
        try:
            product = Product.objects.get(id=request.data["product"])
            cart_item = request.user.cart_items.get(product=product)
            cart_item.delete()
            return Response("Cart item deleted", status=status.HTTP_200_OK)
        except KeyError:
            raise serializers.ValidationError("Product not provided")
        except Product.DoesNotExist:
            raise serializers.ValidationError("Bad product uuid")
        except CartItem.DoesNotExist:
            raise Http404("Product is not in cart")
