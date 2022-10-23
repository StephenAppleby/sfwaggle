from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Product, Category, Brand
from transactions.models import Order, OrderItem, PostalAddress
from core.fixtures import FixtureLoader


class Command(BaseCommand):
    help = "Deletes all users and all data from database, then populates with test fixtures and creates one superuser"

    def handle(self, *args, **options):
        # Delete all users from database
        get_user_model().objects.all().delete()

        # Delete all instances in all models in all apps
        Product.objects.all().delete()
        Category.objects.all().delete()
        Brand.objects.all().delete()
        Order.objects.all().delete()
        OrderItem.objects.all().delete()
        PostalAddress.objects.all().delete()
        self.stdout.write(
            self.style.SUCCESS("Successfully deleted all data from database")
        )

        # Create single super user
        get_user_model().objects.create_superuser(
            email="admin@email.com", password="testpass123"
        )

        # Create testuser
        get_user_model().objects.create_user(
            email="testuser@email.com", password="testpass123"
        )

        # Create staff user
        get_user_model().objects.create_user(
            email="staffuser@email.com", password="testpass123", is_staff=True
        )

        # Repopulate with data from test fixtures
        FixtureLoader.load_fixtures()
        self.stdout.write(
            self.style.SUCCESS(
                "Successfully repopulated database with test fixture data"
            )
        )
