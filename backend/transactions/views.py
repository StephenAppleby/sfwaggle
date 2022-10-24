from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated


class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

        return Response("Received request, not processed", status=status.HTTP_200_OK)
