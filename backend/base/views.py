from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Topic , Task
from .serializers import TopicSerializer , TaskSerializer
from django.http import JsonResponse , HttpResponse
from rest_framework.parsers import JSONParser

# Create your views here.

@csrf_exempt
def getTasks(request):
    if request.method == 'GET':
        data = Task.objects.all()
        serial = TaskSerializer(data , many=True)
        return JsonResponse(serial.data , safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serial = TaskSerializer(data=data)
        if serial.is_valid():
            serial.save()
            return JsonResponse(serial.data , status=201)
        return JsonResponse(serial.error_messages , status=400)

@csrf_exempt
def taskDetails(request , pk):
    try:
        data = Task.objects.get(id=pk)
    except:
        return JsonResponse({"error": "Task Not Found"} , status=404)

    if request.method == "GET":
        serial = TaskSerializer(data)
        return JsonResponse(serial.data , status=200)
    elif request.method == "POST":
        newData = JSONParser().parse(request)
        serial = TaskSerializer(data , data=newData , partial=True)
        if serial.is_valid():
            serial.save()
            return JsonResponse(serial.data , status=201)
        return JsonResponse(serial.error_messages , status=400)



@csrf_exempt
def getTopics(request):
    if request.method == 'GET':
        data = Topic.objects.all()
        serial = TopicSerializer(data , many=True)
        return JsonResponse(serial.data , safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serial = TopicSerializer(data=data)
        if serial.is_valid():
            serial.save()
            return JsonResponse(serial.data , status=201)
        return JsonResponse({"error": "Task not found"} , status=400)


@csrf_exempt
def toggleStatus(request , pk):
    try:
        task = Task.objects.get(id=pk)
        task.status = not task.status
        task.save()
        return JsonResponse( {"success": "Task found"} , status=200)
    except:
        return JsonResponse({"error": "Task not found"} , status=404)







