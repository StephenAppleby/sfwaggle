from django.urls import path
from . import views

urlpatterns = [
    path("dogs/", views.DogListView.as_view(), name="dog-list"),
    path("dogs/<uuid:pk>/", views.DogView.as_view(), name="dog"),
]
