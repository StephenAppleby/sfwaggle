from rest_framework.views import APIView
from rest_framework.response import Response
import json
from pprint import pprint


class ProductListView(APIView):
    def get(self, request):
        filepath = "products/products.json"
        products = None
        with open(filepath, "r") as f:
            products = json.load(f)
        return Response(products)


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
