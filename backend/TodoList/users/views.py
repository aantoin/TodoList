from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from knox.views import LoginView as KnoxLoginView
from rest_framework.authentication import BasicAuthentication
from .models import User
from .serializers import UserSerializer
from knox.auth import TokenAuthentication


class LoginView(KnoxLoginView):
  authentication_classes = [BasicAuthentication]


class RefreshTokenView(APIView):
  def post(self, request):
    return Response(status=200)


class UserViewSet(ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get_permissions(self):
    if self.action == 'create':
      return [permissions.AllowAny()]
    else:
      return [permissions.IsAuthenticated()]
