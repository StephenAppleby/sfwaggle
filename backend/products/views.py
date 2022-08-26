from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .models import Product
from .serializers import ProductSerializer
import json
from pprint import pprint


class ProductListView(APIView):
    # Old json implementation
    # def get(self, request):
    #     filepath = "products/products.json"
    #     products = None
    #     with open(filepath, "r") as f:
    #         products = json.load(f)
    #     print(type(products))
    #     print(repr(products))
    #     return Response(products)

    def get(self, request):
        serializer = ProductSerializer(Product.objects.all(), many=True)
        return Response(serializer.data)


class ProductView(APIView):
    def get(self, request, pk=None):
        filepath = "products/products.json"
        products = None
        print(pk)
        with open(filepath, "r") as f:
            products = json.load(f)
        for p in products:
            if p["_id"] == pk:
                return Response(p)
        return Response()
