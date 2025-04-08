# scanner/urls.py
from django.urls import path
from .views import ScanResultList, ScanResultDetail, serve_wapiti_report

urlpatterns = [
    path('scans/', ScanResultList.as_view(), name='scan-list'),
    path("report/<str:path>", serve_wapiti_report, name="serve_wapiti_report"),
    path('scans/<int:pk>/', ScanResultDetail.as_view(), name='scan-detail'),
]