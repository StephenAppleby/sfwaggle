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
        cls.products["Blue and green rope chew"] = Product.objects.create(
            name="Blue and green rope chew",
            image="product_images/rope_chew_blue_and_green.jpg",
            description="Small rope chew toy for dogs. Great for smaller breeds or puppies",
            brand=cls.brands["Dogz"],
            category=cls.categories["Chew toys"],
            price=3.99,
            count_in_stock=35,
        )
        cls.products["Green rope chew"] = Product.objects.create(
            name="Green rope chew",
            image="product_images/rope_chew_green.jpg",
            description="Small rope chew toy for dogs with loop. Great for playing tug of war with your pet",
            brand=cls.brands["Dogz"],
            category=cls.categories["Chew toys"],
            price=3.99,
            count_in_stock=32,
        )
        cls.products["Yello rope giraffe chew"] = Product.objects.create(
            name="Yello rope giraffe chew",
            image="product_images/rope_chew_yellow.jpg",
            description="Rope chew toy for dogs in the shape of a giraffe",
            brand=cls.brands["K9"],
            category=cls.categories["Chew toys"],
            price=5.49,
            count_in_stock=18,
        )
        cls.products["Orange rubber bone chew"] = Product.objects.create(
            name="Orange rubber bone chew",
            image="product_images/rubber_bone_chew_orange.jpg",
            description="Rubber bone chew for dogs. This single toy will keep your dog entertained for hours",
            brand=cls.brands["PetPeddlerz"],
            category=cls.categories["Chew toys"],
            price=4.29,
            count_in_stock=28,
        )
        cls.products["Blue rubber snack trap"] = Product.objects.create(
            name="Blue rubber snack trap",
            image="product_images/rubber_chew_blue.jpg",
            description="Rubber toy for hiding dog treats. Your dog will enjoy chewing the toy to get the treats out",
            brand=cls.brands["Dogz"],
            category=cls.categories["Snack trap"],
            price=4.29,
            count_in_stock=5,
        )
        cls.products["Red rubber bone chew"] = Product.objects.create(
            name="Red rubber bone chew",
            image="product_images/rubber_chew_red.jpg",
            description="Rubber bone chew for dogs. The knobbly surface of the toy will make it easier for dogs to grip with their teeth",
            brand=cls.brands["K9"],
            category=cls.categories["Chew toys"],
            price=6.99,
            count_in_stock=15,
        )
        cls.products["Red chew ring"] = Product.objects.create(
            name="Red chew ring",
            image="product_images/rubber_plastic_chew_red.jpg",
            description="Chew toy for puppies. Small dogs will enjoying playing and exercising their jaws on this chew toy",
            brand=cls.brands["PetPeddlerz"],
            category=cls.categories["Chew toys"],
            price=2.99,
            count_in_stock=12,
        )

    @classmethod
    def load_fixtures(cls):
        cls.load_categories()
        cls.load_brands()
        cls.load_products()
