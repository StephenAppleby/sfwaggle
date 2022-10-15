from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import serializers
from .models import CartItem, Product
from .serializers import CartItemSerializer, ProductSerializer
from rest_framework import status


class ProductListView(APIView):
    def get(self, request):
        # Will need to paginate
        serializer = ProductSerializer(Product.objects.all(), many=True)
        return Response(serializer.data)


class ProductView(APIView):
    def get(self, request, pk=None):
        serializer = ProductSerializer(Product.objects.get(pk=pk))
        return Response(serializer.data)


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            serializer = CartItemSerializer(
                data=request.data,
                context={"request": request},
            )
            if serializer.is_valid():
                serializer.save()
                request.user.cart_items.add(serializer.instance)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            raise serializers.ValidationError(f"{e} not provided")
        except Product.DoesNotExist:
            raise serializers.ValidationError("Bad product uuid")

    def get(self, request):
        cart_items = request.user.cart_items.all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

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
            return Response("Product is not in cart", status=status.HTTP_404_NOT_FOUND)

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
            return Response("Product is not in cart", status=status.HTTP_404_NOT_FOUND)
