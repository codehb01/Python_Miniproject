from django.contrib.auth.models import User
from rest_framework import serializers
from .models import ScanResult


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class ScanResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScanResult
        fields = ["id", "url", "tool_name", "result", "created_at", "user"]
        extra_kwargs = {"user": {"read_only": True}}  # User is set automatically, not editable via API