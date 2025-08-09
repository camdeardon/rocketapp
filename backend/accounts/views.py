from django.contrib.auth import get_user_model
from rest_framework import status, permissions, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def validate_username(self, v):
        if User.objects.filter(username=v).exists():
            raise serializers.ValidationError("Username already taken.")
        return v

    def validate_email(self, v):
        if User.objects.filter(email=v).exists():
            raise serializers.ValidationError("Email already in use.")
        return v

    def create(self, validated):
        user = User.objects.create_user(
            username=validated["username"],
            email=validated["email"],
            password=validated["password"],
        )
        return user

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        s = RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        user = s.save()
        return Response({"id": user.id, "username": user.username, "email": user.email},
                        status=status.HTTP_201_CREATED)

class MeView(APIView):
    def get(self, request):
        u = request.user
        return Response({"id": u.id, "username": u.username, "email": u.email})
from django.contrib.auth import get_user_model
from rest_framework import status, permissions, serializers
from rest_framework.response import Response
from rest_framework.views import APIView

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def validate_username(self, v):
        if User.objects.filter(username=v).exists():
            raise serializers.ValidationError("Username already taken.")
        return v

    def validate_email(self, v):
        if User.objects.filter(email=v).exists():
            raise serializers.ValidationError("Email already in use.")
        return v

    def create(self, validated):
        user = User.objects.create_user(
            username=validated["username"],
            email=validated["email"],
            password=validated["password"],
        )
        return user

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        s = RegisterSerializer(data=request.data)
        s.is_valid(raise_exception=True)
        user = s.save()
        return Response({"id": user.id, "username": user.username, "email": user.email},
                        status=status.HTTP_201_CREATED)

class MeView(APIView):
    def get(self, request):
        u = request.user
        return Response({"id": u.id, "username": u.username, "email": u.email})
