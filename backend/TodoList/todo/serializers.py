from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import TodoList, TodoListItem


class TodoListSerializer(serializers.ModelSerializer):
  user = serializers.PrimaryKeyRelatedField(
      queryset=get_user_model().objects.all(),
      default=serializers.CurrentUserDefault()
  )

  class Meta:
    model = TodoList
    fields = ['id', 'user', 'name']


class TodoListItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = TodoListItem
    fields = ['id', 'todolist', 'content']
