# # # from django.shortcuts import render
# # # from django.contrib.auth.models import User
# # # from rest_framework import generics, permissions, status
# # # from rest_framework.response import Response
# # # from rest_framework.permissions import IsAuthenticated, AllowAny
# # # from .serializers import UserSerializer, ScanResultSerializer
# # # from .models import ScanResult
# # # from .utils import run_nmap_scan, run_nikto_scan  # Assuming these are in utils.py

# # # class CreateUserView(generics.CreateAPIView):
# # #     """
# # #     API endpoint for creating a new user
# # #     """
# # #     queryset = User.objects.all()
# # #     serializer_class = UserSerializer
# # #     permission_classes = [AllowAny]  # Allow anyone to register

# # # class ScanResultList(generics.ListCreateAPIView):
# # #     """
# # #     API endpoint for listing and creating scan results
# # #     """
# # #     serializer_class = ScanResultSerializer
# # #     permission_classes = [permissions.IsAuthenticated]

# # #     def get_queryset(self):
# # #         """Get scan results for the current user only, ordered by most recent"""
# # #         return ScanResult.objects.filter(user=self.request.user).order_by('-created_at')

# # #     def create(self, request, *args, **kwargs):
# # #         """Create a new scan for the provided URL"""
# # #         url = request.data.get('url')
# # #         if not url:
# # #             return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

# # #         # Run scans using the tools
# # #         nmap_result = run_nmap_scan(url)
# # #         nikto_result = run_nikto_scan(url)

# # #         # Create scan records
# # #         nmap_scan = ScanResult.objects.create(
# # #             url=url,
# # #             tool_name="Nmap",
# # #             result=nmap_result,
# # #             user=request.user
# # #         )
# # #         nikto_scan = ScanResult.objects.create(
# # #             url=url,
# # #             tool_name="Nikto",
# # #             result=nikto_result,
# # #             user=request.user
# # #         )

# # #         # Serialize and return the created scans
# # #         serializer = ScanResultSerializer([nmap_scan, nikto_scan], many=True)
# # #         return Response(serializer.data, status=status.HTTP_201_CREATED)

# # # class ScanResultDetail(generics.RetrieveAPIView):
# # #     """
# # #     API endpoint for retrieving details of a specific scan result
# # #     """
# # #     serializer_class = ScanResultSerializer
# # #     permission_classes = [permissions.IsAuthenticated]

# # #     def get_queryset(self):
# # #         """Get scan results for the current user only"""
# # #         return ScanResult.objects.filter(user=self.request.user)



# # # scanner/views.py
# # from django.shortcuts import render
# # from django.contrib.auth.models import User
# # from rest_framework import generics, permissions, status
# # from rest_framework.response import Response
# # from rest_framework.permissions import IsAuthenticated, AllowAny
# # from .serializers import UserSerializer, ScanResultSerializer
# # from .models import ScanResult
# # from .utils import run_nmap_scan, run_sqlmap_scan

# # class CreateUserView(generics.CreateAPIView):
# #     """
# #     API endpoint for creating a new user
# #     """
# #     queryset = User.objects.all()
# #     serializer_class = UserSerializer
# #     permission_classes = [AllowAny]  # Allow anyone to register

# # class ScanResultList(generics.ListCreateAPIView):
# #     """
# #     API endpoint for listing and creating scan results
# #     """
# #     serializer_class = ScanResultSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def get_queryset(self):
# #         """Get scan results for the current user only, ordered by most recent"""
# #         return ScanResult.objects.filter(user=self.request.user).order_by('-created_at')

# #     def create(self, request, *args, **kwargs):
# #         """Create a new scan for the provided URL"""
# #         url = request.data.get('url')
# #         if not url:
# #             return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)

# #         # Run scans using the tools
# #         nmap_result = run_nmap_scan(url)
# #         # nikto_result = run_nikto_scan(url)
# #         sqlmap_result = run_sqlmap_scan(url)

# #         # Check for errors in scan results
# #         if "Error" in nmap_result:
# #             return Response({"error": f"Nmap scan failed: {nmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# #         # if "Error" in nikto_result:
# #             # return Response({"error": f"Nikto scan failed: {nikto_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# #         if "Error" in sqlmap_result:
# #             return Response({"error": f"SQLMap scan failed: {sqlmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# #         # Create scan records
# #         nmap_scan = ScanResult.objects.create(
# #             url=url,
# #             tool_name="Nmap",
# #             result=nmap_result,
# #             user=request.user
# #         )
# #         # nikto_scan = ScanResult.objects.create(
# #         #     url=url,
# #         #     tool_name="Nikto",
# #         #     result=nikto_result,
# #         #     user=request.user
# #         # )
# #         sqlmap_scan = ScanResult.objects.create(
# #             url=url,
# #             tool_name="SQLMap",
# #             result=sqlmap_result,
# #             user=request.user
# #         )

# #         # Serialize and return the created scans
# #         serializer = ScanResultSerializer([nmap_scan, sqlmap_scan], many=True)
# #         return Response(serializer.data, status=status.HTTP_201_CREATED)

# # class ScanResultDetail(generics.RetrieveAPIView):
# #     """
# #     API endpoint for retrieving details of a specific scan result
# #     """
# #     serializer_class = ScanResultSerializer
# #     permission_classes = [permissions.IsAuthenticated]

# #     def get_queryset(self):
# #         """Get scan results for the current user only"""
# #         return ScanResult.objects.filter(user=self.request.user)


# # scanner/views.py
# from django.shortcuts import render
# from django.contrib.auth.models import User
# from rest_framework import generics, permissions, status
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from .serializers import UserSerializer, ScanResultSerializer
# from .models import ScanResult
# from .utils import run_nmap_scan, run_sqlmap_scan

# class CreateUserView(generics.CreateAPIView):
#     """
#     API endpoint for creating a new user
#     """
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [AllowAny]  # Allow anyone to register

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
#         # nikto_result = run_nikto_scan(url)
#         sqlmap_result = run_sqlmap_scan(url)

#         # Check for errors in scan results
#         if "Error" in nmap_result:
#             return Response({"error": f"Nmap scan failed: {nmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         # if "Error" in nikto_result:
#             # return Response({"error": f"Nikto scan failed: {nikto_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#         if "Error" in sqlmap_result:
#             return Response({"error": f"SQLMap scan failed: {sqlmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         # Create scan records
#         nmap_scan = ScanResult.objects.create(
#             url=url,
#             tool_name="Nmap",
#             result=nmap_result,
#             user=request.user
#         )
#         # nikto_scan = ScanResult.objects.create(
#         #     url=url,
#         #     tool_name="Nikto",
#         #     result=nikto_result,
#         #     user=request.user
#         # )
#         sqlmap_scan = ScanResult.objects.create(
#             url=url,
#             tool_name="SQLMap",
#             result=sqlmap_result,
#             user=request.user
#         )

#         # Serialize and return the created scans
#         serializer = ScanResultSerializer([nmap_scan, sqlmap_scan], many=True)
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


# scanner/views.py
from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, ScanResultSerializer
from .models import ScanResult
from .utils import run_nmap_scan, run_sqlmap_scan, run_wapiti_scan

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

        # Check for errors in scan results
        if "Error" in nmap_result:
            return Response({"error": f"Nmap scan failed: {nmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if "Error" in sqlmap_result:
            return Response({"error": f"SQLMap scan failed: {sqlmap_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if "Error" in wapiti_result:
            return Response({"error": f"Wapiti scan failed: {wapiti_result}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

        # Serialize and return the created scans
        serializer = ScanResultSerializer([nmap_scan, sqlmap_scan, wapiti_scan], many=True)
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