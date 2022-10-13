from django.urls import path

from . import views

# "^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$"

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="product-list"),
    path("product/<uuid:pk>/", views.ProductView.as_view(), name="product"),
    path("cart/", views.CartView.as_view(), name="cart"),
]
