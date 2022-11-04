import random
from django.contrib.auth import get_user_model
from products.models import Product, Category, Brand, Review
from dogs.models import Dog
from .fixture_usernames import usernames
from transactions.models import Order, OrderItem, PostalAddress


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
    def load_dogs(cls):
        cls.dogs = dict()
        cls.dogs["Berno"] = Dog.objects.create(
            name="Berno",
            image="dog_images/berno.jpg",
            description="Curious and frank, Berno is a loyal companion. He may not be the most affectionate, but he knows who he loves and will stay by their side no matter what.",
            for_sale=True,
            price=560,
        )
        cls.dogs["Cassandra"] = Dog.objects.create(
            name="Cassandra",
            image="dog_images/cassandra.jpg",
            description="Cassandra is a fun loving and affectionate husky with the softest, floofiest coat. She is well trained and always comes bounding up when she hears \"Cas! Come!\". Don't be put off by her penetrating stare, her eyes may be mismatched but she's inevitably just day-dreaming about her favourite snack: fish!",
            for_sale=True,
            price=600,
        )
        cls.dogs["Gallahad"] = Dog.objects.create(
            name="Gallahad",
            image="dog_images/gallahad.jpg",
            description="Timid and shy, this middle aged rover reveals his sweet and goofy nature only to those who persist in getting to know him. He cannot be bought with food, but goes crazy for games and romps with his favorite playmates.",
            for_sale=True,
            price=320,
        )
        cls.dogs["Gruffles"] = Dog.objects.create(
            name="Gruffles",
            image="dog_images/gruffles.jpg",
            description="Gruffles was the loving companion of his owner Madisson, a sweet old lady who loved him well and sadly passed when he was 3 years old. He is now looking for an owner who can keep up with his love for the outdoors. Favorite hobby: stick fetching.",
            for_sale=True,
            price=515,
        )
        cls.dogs["Lulu"] = Dog.objects.create(
            name="Lulu",
            image="dog_images/lulu.jpg",
            description="This stout chihuahua is prim and proper until her sharp nose picks up the scent of treats. Then there can only be one thing on her mind! Her gourmand habits make her tractable and willing to go along with any plan, along as she is duly recompensed with snax!",
            for_sale=True,
            price=360,
        )
        cls.dogs["Poppy"] = Dog.objects.create(
            name="Poppy",
            image="dog_images/poppy.jpg",
            description="Soft tempered and sweet natured, Poppy is the perfect indoors companion pet. Her favourite past times include snuggling up on a lap in the evenings and being cuddled and petted.",
            for_sale=True,
            price=460,
        )

    @classmethod
    def load_users(cls):
        cls.users = []
        for x in range(32):
            email = f"{usernames[x]}@email.com"
            cls.users.append(
                get_user_model().objects.create_user(
                    email=email, password="testpass123"
                )
            )

    @classmethod
    def load_orders(cls):
        cls.orders = []
        order_status_choices = ["PE", "DE"]
        postal_address = {
            "address": "fish",
            "postal_code": "fish",
            "city": "fish",
            "country": "fish",
        }
        for x in range(20):
            order = Order(
                submitted_by=cls.users[x],
                payment_status="FP",
                order_status=order_status_choices[x % 2],
            )
            order.save()
            PostalAddress.objects.create(order=order, **postal_address)
            products = [*cls.products.values()]
            for y in range(4):
                product = random.choice(products)
                products.remove(product)
                order_item = OrderItem.objects.create(
                    order=order, product=product, qty=(y + 1)
                )
                order.items.add(order_item)
            order.save()
            cls.orders.append(order)

    @classmethod
    def load_reviews(cls):
        review_bodies = [
            # 0/5
            [
                "Not worth spending money on",
                "Broke first time I gave it to my dog",
                "The color was wrong",
                "Terrible quality",
            ],
            # 1/5
            [
                "My dog never plays with it",
                "Much too expensive for what it is",
                "Poor quality",
            ],
            # 2/5
            [
                "It's pretty cheap materials, but my dog seems ok with it",
                "Not great, fell to pieces in a couple of days",
                "Not sure if my dog enjoyed this toy, it disappeared after a few hours",
                "The product smells kinda funny...",
            ],
            # 3/5
            [
                "My dogs fight over who gets to play first. But cheap materials",
                "Great quality, but arrived several days late",
                "I ordered five of these and they lasted a couple of days each. Not bad",
                "Still finding pieces behind my couch several months later...",
                "Not bad",
            ],
            # 4/5
            [
                "Can recommend",
                "Pretty good",
                "Great fun to watch my dogs fighting over these toys",
                "My little Sebastian had a great time chewing and playing with this toy, until our dog Brutus came and took it from him =*(",
                "Good quality, I've bought several products from Sfwaggle and they always come on time.",
                "Good enough, but a little tacky",
            ],
            # 5/5
            [
                "Great quality, really good service and help from the team at Sfwaggle",
                "I keep coming back to these, my dogs can't get enough!",
                "=D",
                "My dogs love these toys, they're always so excited when they see we have a new box from Sfwaggle",
                "Good quality, just what I ordered",
                "Recommended",
                "Always the best products",
                "Dogs love these, can recommend",
                "So glad I found Sfwaggle! Fantastic quality",
                "Thumbs up",
                "Bought these 4 times now, they only last a few days as my dogs tear them to pieces, but keeps the occupied",
            ],
        ]

        review_ratings = [0] * 2 + [1] * 2 + [2] * 3 + [3] * 4 + [4] * 5 + [5] * 10
        cls.reviews = []

        for user in cls.users:
            for product in user.get_products_eligible_for_review():
                # Half eligible products get reviews
                if random.randrange(2) % 2 == 0:
                    rating = random.choice(review_ratings)
                    # Half reviews get bodies
                    body = (
                        random.choice(review_bodies[rating])
                        if random.randrange(2) % 2 == 0
                        else ""
                    )
                    cls.reviews.append(
                        Review.objects.create(
                            body=body, rating=rating, product=product, user=user
                        )
                    )
                product.save()
            user.save()

    @classmethod
    def load_floofs(cls):
        for x in range(12):
            cls.dogs["Berno"].floofs.add(cls.users[x])
        cls.dogs["Berno"].save()
        for x in range(21):
            cls.dogs["Cassandra"].floofs.add(cls.users[x])
        cls.dogs["Cassandra"].save()
        for x in range(19):
            cls.dogs["Gallahad"].floofs.add(cls.users[x])
        cls.dogs["Gallahad"].save()
        for x in range(32):
            cls.dogs["Gruffles"].floofs.add(cls.users[x])
        cls.dogs["Gruffles"].save()
        for x in range(8):
            cls.dogs["Lulu"].floofs.add(cls.users[x])
        cls.dogs["Lulu"].save()
        for x in range(18):
            cls.dogs["Poppy"].floofs.add(cls.users[x])
        cls.dogs["Poppy"].save()

    @classmethod
    def load_fixtures(cls):
        cls.load_categories()
        cls.load_brands()
        cls.load_products()
        cls.load_dogs()
        cls.load_users()
        cls.load_orders()
        cls.load_reviews()
        cls.load_floofs()
