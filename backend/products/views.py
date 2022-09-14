from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer


class ProductListView(APIView):
    def get(self, request):
        serializer = ProductSerializer(Product.objects.all(), many=True)
        return Response(serializer.data)


class ProductView(APIView):
    def get(self, request, pk=None):
        serializer = ProductSerializer(Product.objects.get(pk=pk))
        return Response(serializer.data)


stuff = [{"pk": 1, "name": "fish"}, {"pk": 2, "name": "moose"}]


class MockStuff(APIView):
    def get(self, request):
        return Response(stuff)


class MockThing(APIView):
    def get(self, request, pk=None):
        for thing in stuff:
            if thing["pk"] == pk:
                return Response(thing)
