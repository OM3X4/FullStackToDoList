from django.urls import path
from .views import getTasks , getTopics , toggleStatus , taskDetails


urlpatterns = [
    path('tasks' , getTasks),
    path('topics' , getTopics),
    path('toggle/<int:pk>' , toggleStatus),
    path('tasks/<int:pk>' , taskDetails)
]