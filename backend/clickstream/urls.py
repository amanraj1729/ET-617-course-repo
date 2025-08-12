from django.urls import path
from .views import ClickstreamLogView

urlpatterns = [
    path('log/', ClickstreamLogView.as_view(), name='clickstream-log'),
]
