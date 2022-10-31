from dj_rest_auth.serializers import UserDetailsSerializer


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ("email",)
        read_only_fields = ("email",)
