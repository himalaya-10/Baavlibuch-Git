# myapp/views.py
from django.http import JsonResponse
from django.shortcuts import render, HttpResponse
from nltk import ngrams


def get_ngrams(request, text1, text2):

    n = 1 
    ngrams1 = set(ngrams(text1.split(), n))
    ngrams2 = set(ngrams(text2.split(), n))

    intersection = len(ngrams1.intersection(ngrams2))
    union = len(ngrams1) + len(ngrams2) - intersection

    jaccard_similarity = intersection / union if union != 0 else 0 

    if jaccard_similarity >= 0.5:
        result = {"result": 1}
    else:
        result = {"result": 0}
    return JsonResponse(result)


def home(request):
    return HttpResponse("Hello World!")