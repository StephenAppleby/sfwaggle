from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import DogSerializer
from .models import Dog


class DogListView(APIView):
    def get(self, request):
        serializer = DogSerializer(Dog.objects.all().order_by("price"), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DogView(APIView):
    def get(self, request, pk=None):
        try:
            serializer = DogSerializer(Dog.objects.get(pk=pk))
            return Response(serializer.data)
        except Dog.DoesNotExist as e:
            raise Http404(e)


class DogFloofToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk=None):
        try:
            dog = Dog.objects.get(pk=pk)
            is_floofed_by_user = request.user in dog.floofs.all()
            message = ""
            if is_floofed_by_user:
                dog.floofs.remove(request.user)
                message = "Floof removed"
            else:
                dog.floofs.add(request.user)
                message = "Floof added"
            dog.save()
            return Response(message, status=status.HTTP_200_OK)
        except Dog.DoesNotExist as e:
            raise Http404(e)
