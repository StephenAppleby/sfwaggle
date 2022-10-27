from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated


class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer_in = OrderSerializer(data=request.data, context={"request": request})
        if serializer_in.is_valid():
            order = serializer_in.save()
            print(serializer_in.data)
            serializer_out = OrderSerializer(order)
            print(serializer_out.data)
            return Response(serializer_out.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer_in.errors, status=status.HTTP_400_BAD_REQUEST)
