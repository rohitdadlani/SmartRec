from django.utils import timezone

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserSerializer

User = get_user_model()


class RegisterUserView(generics.CreateAPIView):
    """API to register a new user"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(
                {"message": "User registered successfully!", "user": UserSerializer(user).data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT Serializer to include user details in response"""

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user  # Get the user instance

        # Check if the user is logging in for the first time
        is_first_login = user.last_login is None

        # Update last_login field (Django does this automatically after login)
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        # Add user details separately in the response, not inside the token payload
        user_data = {
            "email": user.email,
            "full_name": user.full_name,
            "is_first_login": is_first_login  # Flag indicating first login
        }
        return {**data, **user_data}  # Merge token data with user info



class LoginView(TokenObtainPairView):
    """API for user login with JWT authentication"""
    serializer_class = CustomTokenObtainPairSerializer


class ProfileView(generics.RetrieveAPIView):
    """API to fetch user profile"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user  # Get the currently logged-in user
