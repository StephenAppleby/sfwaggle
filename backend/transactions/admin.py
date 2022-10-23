from django.contrib import admin
from .models import Order, OrderItem, PostalAddress


class PostalAddressInline(admin.StackedInline):
    model = PostalAddress


class OrderItemInline(admin.TabularInline):
    model = OrderItem


class OrderAdmin(admin.ModelAdmin):
    inlines = [PostalAddressInline, OrderItemInline]


admin.site.register(Order, OrderAdmin)
