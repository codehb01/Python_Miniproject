from django.db import models
from django.contrib.auth.models import User

class ScanResult(models.Model):
    url = models.URLField(max_length=200)  # The website URL being scanned
    tool_name = models.CharField(max_length=50)  # Name of the scanning tool (e.g., Nmap, Nikto)
    result = models.TextField()  # The raw output or summary of the scan
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of when the scan was run
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="scans")  # Link to the user who initiated the scan

    def __str__(self):
        return f"{self.url} - {self.tool_name} ({self.created_at})"