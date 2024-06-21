from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .serializers import SignUpSerializer, LoginSerializer
from django.contrib.auth.hashers import make_password, check_password

@api_view(['POST'])
def signup(request):
    serializer = SignUpSerializer(data=request.data)
    if serializer.is_valid():
        name = serializer.validated_data['name']
        email = serializer.validated_data['email']
        password = make_password(serializer.validated_data['password'])

        if settings.MONGO_DB.users.find_one({"email": email}):
            return Response({"error": "User already exists"}, status=400)

        settings.MONGO_DB.users.insert_one({
            "name": name,
            "email": email,
            "password": password,
        })

        return Response({"message": "Signup successful"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        user = settings.MONGO_DB.users.find_one({"email": email})
        if user and check_password(password, user['password']):
            return Response({"message": "Login successful"}, status=200)
        return Response({"error": "Invalid credentials"}, status=400)
    return Response(serializer.errors, status=400)
