from django.contrib.auth import get_user_model
from rest_framework import serializers


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    dogsFloofed = serializers.PrimaryKeyRelatedField(
        source="dogs_floofed", many=True, read_only=True
    )
    productsEligibleForReview = serializers.PrimaryKeyRelatedField(
        source="get_products_eligible_for_review", many=True, read_only=True
    )

    class Meta:
        model = get_user_model()
        fields = ("email", "dogsFloofed", "productsEligibleForReview")
        read_only_fields = ("email", "dogsFloofed", "productsEligibleForReview")
