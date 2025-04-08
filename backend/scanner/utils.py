# scanner/utils.py
import subprocess
import os

def run_nmap_scan(url):
    hostname = url.split("://")[1] if "://" in url else url
    try:
        nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
        return subprocess.check_output([nmap_path, "-F", hostname], text=True)
    except Exception as e:
        return f"Error: {str(e)}"

def run_sqlmap_scan(url):
    try:
        sqlmap_path = r"C:\sqlmap\sqlmap.py"
        command = ["python", sqlmap_path, "-u", url, "--batch", "--dbs"]
        return subprocess.check_output(command, text=True)
    except Exception as e:
        return f"Error: {str(e)}"
    

def run_wapiti_scan(url):
    try:
        wapiti_path = r"C:\Users\nandu\AppData\Local\Programs\Python\Python312\Scripts\wapiti.exe"
        command = [wapiti_path, "-u", url]
        if not os.path.exists(wapiti_path):
            return f"Error: Wapiti executable not found at {wapiti_path}"
        result = subprocess.run(
            command,
            text=True,
            capture_output=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"Error: Wapiti failed with exit code {e.returncode}: stdout: '{e.stdout}', stderr: '{e.stderr}'"
    except Exception as e:
        return f"Error: {str(e)}"