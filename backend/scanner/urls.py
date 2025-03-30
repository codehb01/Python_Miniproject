# scanner/urls.py
from django.urls import path
from .views import ScanResultList, ScanResultDetail

urlpatterns = [
    path('scans/', ScanResultList.as_view(), name='scan-list'),
    path('scans/<int:pk>/', ScanResultDetail.as_view(), name='scan-detail'),
]