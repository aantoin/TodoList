from django.urls import path, include
from rest_framework_nested import routers
from .views import TodoListViewSet, TodoListItemViewSet

router = routers.SimpleRouter()
router.register(r'list', TodoListViewSet)
todolist_router = routers.NestedSimpleRouter(router, r'list', lookup='list')
todolist_router.register(r'item', TodoListItemViewSet)
urlpatterns = [
    path(r'', include(router.urls)),
    path(r'', include(todolist_router.urls)),
]
