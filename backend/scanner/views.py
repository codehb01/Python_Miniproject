# scanner/views.py
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ScanResultSerializer
from .models import ScanResult
from .utils import run_nmap_scan, run_sqlmap_scan, run_wapiti_scan
import requests
import json
import base64

from django.http import FileResponse
import os

def serve_wapiti_report(request, path):
    file_path = os.path.join("C:\\Users\\nandu\\.wapiti\\generated_report", path)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, "rb"), as_attachment=True)
    return Response({"error": "Report not found"}, status=404)

# Add VirusTotal API key (for testing; consider using environment variables in production)
VIRUSTOTAL_API_KEY = "d477bdaf5b247a849de3144b02663567342a71dbc8aa4c5992299eb5e692b301"  # Replace with your actual API key

def scan_url_with_virustotal(url):
    """
    Scan a URL using VirusTotal API
    """
    # API endpoint to submit the scan
    url_scan_endpoint = 'https://www.virustotal.com/api/v3/urls'

    # Headers for authentication
    headers = {
        'x-apikey': VIRUSTOTAL_API_KEY
    }

    # Submit URL for scanning
    scan_data = {'url': url}
    response = requests.post(url_scan_endpoint, headers=headers, data=scan_data)

    if response.status_code != 200:
        return {"error": f"Failed to submit URL for scanning: {response.text}"}

    # Convert the URL to the correct URL ID using base64
    url_bytes = url.encode('utf-8')
    url_id = base64.urlsafe_b64encode(url_bytes).decode().rstrip("=")

    # Get the report using the encoded URL identifier
    report_url = f'https://www.virustotal.com/api/v3/urls/{url_id}'
    report_response = requests.get(report_url, headers=headers)

    if report_response.status_code != 200:
        return {"error": f"Failed to get report: {report_response.text}"}

    return report_response.json()

def parse_virustotal_results(results):
    """
    Parse the VirusTotal scan results into a user-friendly format
    """
    if "error" in results:
        return results
    
    try:
        attributes = results.get('data', {}).get('attributes', {})
        stats = attributes.get('last_analysis_stats', {})
        last_analysis_results = attributes.get('last_analysis_results', {})
        
        parsed_results = {
            'harmless': stats.get('harmless', 0),
            'malicious': stats.get('malicious', 0),
            'suspicious': stats.get('suspicious', 0),
            'undetected': stats.get('undetected', 0),
            'timeout': stats.get('timeout', 0),
            'total_scans': sum(stats.values()) if stats else 0,
            'scan_date': attributes.get('last_analysis_date'),
            'detections': []
        }
        
        # Add individual detections
        for engine, result in last_analysis_results.items():
            if result.get('category') in ['malicious', 'suspicious']:
                parsed_results['detections'].append({
                    'engine': engine,
                    'category': result.get('category'),
                    'result': result.get('result')
                })
        
        return parsed_results
    except Exception as e:
        return {"error": f"Failed to parse results: {str(e)}"}

class CreateUserView(generics.CreateAPIView):
    """
    API endpoint for creating a new user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ScanResultList(generics.ListCreateAPIView):
    """
    API endpoint for listing and creating scan results
    """
    serializer_class = ScanResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Get scan results for the current user only, ordered by most recent"""
        return ScanResult.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        """Create a new scan for the provided URL"""
        url = request.data.get('url')
        if not url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Run scans using the tools
        nmap_result = run_nmap_scan(url)
        sqlmap_result = run_sqlmap_scan(url)
        wapiti_result = run_wapiti_scan(url)
        virustotal_raw = scan_url_with_virustotal(url)
        virustotal_result = parse_virustotal_results(virustotal_raw)

        # Check for errors in scan results
        if "Error" in nmap_result:
            return Response({"error": f"Nmap scan failed: {nmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if "Error" in sqlmap_result:
            return Response({"error": f"SQLMap scan failed: {sqlmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if "Error" in wapiti_result:
            return Response({"error": f"Wapiti scan failed: {wapiti_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if "error" in virustotal_result:
            return Response({"error": f"VirusTotal scan failed: {virustotal_result['error']}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Create scan records
        nmap_scan = ScanResult.objects.create(
            url=url,
            tool_name="Nmap",
            result=nmap_result,
            user=request.user
        )
        sqlmap_scan = ScanResult.objects.create(
            url=url,
            tool_name="SQLMap",
            result=sqlmap_result,
            user=request.user
        )
        wapiti_scan = ScanResult.objects.create(
            url=url,
            tool_name="Wapiti",
            result=wapiti_result,
            user=request.user
        )
        virustotal_scan = ScanResult.objects.create(
            url=url,
            tool_name="VirusTotal",
            result=json.dumps(virustotal_result),  # Serialize to JSON for storage
            user=request.user
        )

        # Serialize and return the created scans
        serializer = ScanResultSerializer([nmap_scan, sqlmap_scan, wapiti_scan, virustotal_scan], many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class ScanResultDetail(generics.RetrieveAPIView):
    """
    API endpoint for retrieving details of a specific scan result
    """
    serializer_class = ScanResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Get scan results for the current user only"""
        return ScanResult.objects.filter(user=self.request.user)
    



    #     # scanner/views.py
# from django.shortcuts import render
# from django.contrib.auth.models import User
# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from .serializers import UserSerializer, ScanResultSerializer
# from .models import ScanResult
# from .utils import run_nmap_scan, run_sqlmap_scan, run_wapiti_scan



# from django.http import FileResponse
# import os

# def serve_wapiti_report(request, path):
#     file_path = os.path.join("C:\\Users\\nandu\\.wapiti\\generated_report", path)
#     if os.path.exists(file_path):
#         return FileResponse(open(file_path, "rb"), as_attachment=True)
#     return Response({"error": "Report not found"}, status=404)




# class CreateUserView(generics.CreateAPIView):
#     """
#     API endpoint for creating a new user
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]

# class ScanResultList(generics.ListCreateAPIView):
#     """
#     API endpoint for listing and creating scan results
#     """
#     serializer_class = ScanResultSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         """Get scan results for the current user only, ordered by most recent"""
#         return ScanResult.objects.filter(user=self.request.user).order_by('-created_at')

#     def create(self, request, *args, **kwargs):
#         """Create a new scan for the provided URL"""
#         url = request.data.get('url')
#         if not url:
#             return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

#         # Run scans using the tools
#         nmap_result = run_nmap_scan(url)
#         sqlmap_result = run_sqlmap_scan(url)
#         wapiti_result = run_wapiti_scan(url)

#         # Check for errors in scan results
#         if "Error" in nmap_result:
#             return Response({"error": f"Nmap scan failed: {nmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         if "Error" in sqlmap_result:
#             return Response({"error": f"SQLMap scan failed: {sqlmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         if "Error" in wapiti_result:
#             return Response({"error": f"Wapiti scan failed: {wapiti_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Create scan records
#         nmap_scan = ScanResult.objects.create(
#             url=url,
#             tool_name="Nmap",
#             result=nmap_result,
#             user=request.user
#         )
#         sqlmap_scan = ScanResult.objects.create(
#             url=url,
#             tool_name="SQLMap",
#             result=sqlmap_result,
#             user=request.user
#         )
#         wapiti_scan = ScanResult.objects.create(
#             url=url,
#             tool_name="Wapiti",
#             result=wapiti_result,
#             user=request.user
#         )

#         # Serialize and return the created scans
#         serializer = ScanResultSerializer([nmap_scan, sqlmap_scan, wapiti_scan], many=True)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

# class ScanResultDetail(generics.RetrieveAPIView):
#     """
#     API endpoint for retrieving details of a specific scan result
#     """
#     serializer_class = ScanResultSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         """Get scan results for the current user only"""
#         return ScanResult.objects.filter(user=self.request.user)
