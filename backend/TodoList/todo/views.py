from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TodoList, TodoListItem
from .serializers import TodoListSerializer, TodoListItemSerializer

# Create your views here.


class TodoListViewSet(ModelViewSet):
  queryset = TodoList.objects.all()
  serializer_class = TodoListSerializer

  def get_queryset(self):
    user = self.request.user
    return TodoList.objects.filter(user=user)


class TodoListItemViewSet(ModelViewSet):
  queryset = TodoListItem.objects.all()
  serializer_class = TodoListItemSerializer

  def get_queryset(self):
    user = self.request.user
    return TodoListItem.objects.filter(todolist__id=self.kwargs.get('list_pk'), todolist__user=user)
