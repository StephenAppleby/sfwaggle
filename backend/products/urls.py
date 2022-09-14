from django.urls import path

from . import views

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="product-list"),
    path("product/<int:pk>/", views.ProductView.as_view(), name="product"),
    path("stuff/", views.MockStuff.as_view(), name="mock-stuff"),
    path("thing/<int:pk>/", views.MockThing.as_view(), name="mock-thing"),
]
