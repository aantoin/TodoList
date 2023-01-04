from django.db import models
from django.conf import settings

# Create your models here.


class TodoList(models.Model):
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  name = models.CharField(max_length=50, blank=False)


class TodoListItem(models.Model):
  todolist = models.ForeignKey('TodoList', on_delete=models.CASCADE)
  content = models.CharField(max_length=50, blank=False)
