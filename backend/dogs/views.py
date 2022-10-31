from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DogSerializer
from .models import Dog


class DogListView(APIView):
    def get(self, request):
        serializer = DogSerializer(Dog.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DogView(APIView):
    def get(self, request, pk=None):
        try:
            serializer = DogSerializer(Dog.objects.get(pk=pk))
            return Response(serializer.data)
        except Dog.DoesNotExist as e:
            raise Http404(e)
