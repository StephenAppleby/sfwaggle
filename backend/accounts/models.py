from django.contrib.auth.models import BaseUserManager, PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from products.models import CartItem
from django.utils import timezone
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, is_staff=False):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(email=self.normalize_email(email), is_staff=is_staff)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password=password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    # See https://github.com/django/django/blob/0dd29209091280ccf34e07c9468746c396b7778e/django/contrib/auth/models.py#L334

    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Designates whether this user should be treated as active. "
        "Unselect this instead of deleting accounts.",
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    cart_items = models.ManyToManyField(CartItem)

    objects = CustomUserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_products_eligible_for_review(self):
        products = set()
        for order in self.orders:
            if order.order_status == "DE":
                products.update([item.product for item in order.items])
        return products
