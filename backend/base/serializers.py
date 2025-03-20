from rest_framework import serializers
from .models import Topic , Task


class TaskSerializer(serializers.ModelSerializer):


    class Meta:
        model = Task
        fields = ['id' , 'name' , "topic", 'status' , 'created' , 'updated']




class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'