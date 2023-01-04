from django.urls import path, include
from rest_framework_nested import routers
from rest_framework.generics import RetrieveAPIView
from .views import UserViewSet

router = routers.SimpleRouter()
router.register(r'user', UserViewSet)
urlpatterns = [
    path(r'', include(router.urls)),
]
