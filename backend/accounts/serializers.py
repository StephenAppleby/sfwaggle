from dj_rest_auth.serializers import UserDetailsSerializer


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ("email", "favourite_color")
        read_only_fields = ("email",)
