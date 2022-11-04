from django.urls import path

from . import views

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="product-list"),
    path("product/<uuid:pk>/", views.ProductView.as_view(), name="product"),
    path("reviews/", views.ReviewView.as_view(), name="reviews"),
    path("cart/", views.CartView.as_view(), name="cart"),
]
