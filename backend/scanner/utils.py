# scanner/utils.py
import subprocess

def run_nmap_scan(url):
    hostname = url.split("://")[1] if "://" in url else url
    try:
        return subprocess.check_output(["nmap", "-F", hostname], text=True)
    except Exception as e:
        return f"Error: {str(e)}"

def run_nikto_scan(url):
    try:
        return subprocess.check_output(["nikto", "-h", url], text=True)
    except Exception as e:
        return f"Error: {str(e)}"