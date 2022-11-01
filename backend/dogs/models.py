import uuid
from django.conf import settings
from django.db import models


class Dog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=63)
    image = models.ImageField(upload_to="dog_images/", blank=True)
    description = models.TextField(max_length=1023)
    for_sale = models.BooleanField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    posted = models.DateTimeField(auto_now_add=True)
    floofs = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="dogs_floofed"
    )

    def get_floofs_num(self):
        return len(self.floofs.all())

    def __str__(self):
        return str(self.name)
