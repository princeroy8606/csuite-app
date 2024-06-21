# quiz_app/views.py
''''
from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from django.conf import settings

class GetQuestions(APIView):
    def get(self, request):
        client = MongoClient(settings.MONGODB_HOST, settings.MONGODB_PORT)
        db = client[settings.MONGODB_DATABASE]
        questions_collection = db['questions']
        questions = list(questions_collection.find({}, {'_id': False}))
        return Response(questions)
'''