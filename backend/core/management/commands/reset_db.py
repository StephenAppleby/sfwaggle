from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from products.models import Product, Category, Brand
from core.fixtures import FixtureLoader


class Command(BaseCommand):
    help = "Deletes all non admin users and all data from database, then populates with test fixtures"

    def handle(self, *args, **options):
        # Delete all non admin users and all data from database
        get_user_model().objects.filter(is_superuser=False).delete()
        Product.objects.all().delete()
        Category.objects.all().delete()
        Brand.objects.all().delete()
        self.stdout.write(
            self.style.SUCCESS("Successfully deleted all data from database")
        )

        # Repopulate with data from test fixtures
        FixtureLoader.load_fixtures()
        self.stdout.write(
            self.style.SUCCESS(
                "Successfully repopulated database with test fixture data"
            )
        )
