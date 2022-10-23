from django.urls import path

from . import views

urlpatterns = [path("placeorder/", views.PlaceOrderView.as_view(), name="placeorder")]
