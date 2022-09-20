from django.urls import path

from . import views

# "^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$"

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="product-list"),
    path("products/<pks>/", views.ProductListView.as_view(), name="product-list"),
    path("product/<uuid:pk>/", views.ProductView.as_view(), name="product"),
    path("stuff/", views.MockStuff.as_view(), name="mock-stuff"),
    path("thing/<int:pk>/", views.MockThing.as_view(), name="mock-thing"),
]
