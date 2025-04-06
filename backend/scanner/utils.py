# scanner/utils.py
import subprocess

# def run_nmap_scan(url):
#     hostname = url.split("://")[1] if "://" in url else url
#     try:
#         nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
#         return subprocess.check_output([nmap_path, "-F", hostname], text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"
def run_nmap_scan(url):
    hostname = url.split("://")[1] if "://" in url else url
    hostname = hostname.split("/")[0]  # Ensure hostname is extracted properly
    try:
        nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
        return subprocess.check_output([nmap_path, "-Pn", "-F", hostname], text=True)
    except Exception as e:
        return f"Error: {str(e)}"



# def run_sqlmap_scan(url):
#     try:
#         sqlmap_path = r"C:\sqlmap\sqlmap.py"
#         command = ["python", sqlmap_path, "-u", url, "--batch", "--dbs"]
#         return subprocess.check_output(command, text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"

def run_sqlmap_scan(url):
    try:
        sqlmap_path = r"C:\sqlmap\sqlmap.py"
        command = ["python", sqlmap_path, "-u", url, "--batch", "--dbs", "--level=5", "--risk=3", "--tamper=space2comment"]
        return subprocess.check_output(command, text=True)
    except Exception as e:
        return f"Error: {str(e)}"



# def run_wapiti_scan(url):
#     try:
#         command = ["wapiti", "-u", url]
#         return subprocess.check_output(command, text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"


def run_wapiti_scan(url):
    try:
        command = ["wapiti", "-u", url, "-m", "all", "--scope", "folder"]
        return subprocess.check_output(command, text=True)
    except Exception as e:
        return f"Error: {str(e)}"
