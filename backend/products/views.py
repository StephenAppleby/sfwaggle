from rest_framework.views import APIView
from rest_framework.response import Response
import json
import os


class ProductListView(APIView):
    def get(self, request):
        filepath = "products/products.json"
        products = None
        with open(filepath, "r") as f:
            products = json.load(f)
        return Response(products)
