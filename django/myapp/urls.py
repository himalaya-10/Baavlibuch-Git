# myapp/urls.py
from django.urls import path
from .views import get_ngrams,home

urlpatterns = [
    path('get_ngrams/<str:text1>/<str:text2>/', get_ngrams, name='get_ngrams'),
    path('',home, name='home'),
]
