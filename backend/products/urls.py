from django.urls import path

from . import views

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="product-list"),
    path("product/<int:pk>/", views.ProductView.as_view(), name="product"),
]
