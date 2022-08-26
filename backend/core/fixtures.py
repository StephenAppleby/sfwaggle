from products.models import Product, Category, Brand


class FixtureLoader:
    @classmethod
    def load_categories(cls):
        cls.categories = dict()
        cls.categories["Balls"] = Category.objects.create(name="Balls")
        cls.categories["Chew toys"] = Category.objects.create(name="Chew toys")
        cls.categories["Snack trap"] = Category.objects.create(name="Snack trap")

    @classmethod
    def load_brands(cls):
        cls.brands = dict()
        cls.brands["K9"] = Brand.objects.create(name="K9")
        cls.brands["Dogz"] = Brand.objects.create(name="Dogz")
        cls.brands["PetPeddlerz"] = Brand.objects.create(name="PetPeddlerz")

    @classmethod
    def load_products(cls):
        cls.products = dict()
        cls.products["Blue ball toy"] = Product.objects.create(
            name="Blue ball toy",
            image="product_images/ball_blue.jpg",
            description="Bright blue and orange tennis ball. Great for playing fetch in the garden or at the park.",
            brand=cls.brands["K9"],
            category=cls.categories["Balls"],
            price=4.99,
            count_in_stock=0,
        )

    @classmethod
    def load_fixtures(cls):
        cls.load_categories()
        cls.load_brands()
        cls.load_products()
