# scanner/utils.py
import subprocess
import os
import base64
import requests
from urllib.parse import urlparse
import time
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def run_nmap_scan(url):
    try:
        hostname = urlparse(url).hostname  
        if not hostname:
            return "Error: Invalid URL"
        nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
        return subprocess.check_output([nmap_path, "-F", hostname], text=True)
    except Exception as e:
        return f"Error: {str(e)}"

def run_sqlmap_scan(url, crawl_depth=2, use_forms=True):
    try:
        sqlmap_path = r"C:\sqlmap\sqlmap.py"
        
        # Build command dynamically
        command = [
            "python", sqlmap_path,
            "-u", url,
            "--batch",
            "--crawl", str(crawl_depth)
        ]
        
        if use_forms:
            command.append("--forms")

        # Optional: add `--output-dir` to save results
        # command += ["--output-dir=output"]

        # Run the command and capture both stdout and stderr
        result = subprocess.run(
            command,
            capture_output=True,
            text=True
        )
        
        # Check for errors
        if result.returncode != 0:
            return f"[!] SQLMap Error:\n{result.stderr}"
        
        output = result.stdout

        # Custom user-friendly interpretation
        if "no parameter(s) found" in output:
            return (
                "SQLMap ran successfully, but no injectable parameters were found.\n"
                "Tip: Try deeper crawling or ensure the URL has testable query parameters.\n\n"
                f"--- SQLMap Output ---\n{output}"
            )
        return output

    except Exception as e:
        return f"[!] Python Error: {str(e)}"

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

def run_virustotal_scan(url):
    try:
        # Get API key from environment variable
        api_key = os.getenv("VIRUS_TOTAL_API_KEY")
        if not api_key:
            return "Error: VIRUS_TOTAL_API_KEY environment variable not set. Please obtain an API key from https://www.virustotal.com/ and set it."

        # Step 1: Submit URL for scanning
        submit_url = "https://www.virustotal.com/api/v3/urls"
        headers = {"x-apikey": api_key}
        url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")
        
        # Submit the URL
        submit_response = requests.post(submit_url, headers=headers, json={"url": url})
        submit_data = submit_response.json()
        logger.debug(f"Submit response: {submit_data}")  # Debug log

        if submit_response.status_code != 200:
            return f"Error: Failed to submit URL (Status: {submit_response.status_code}): {submit_data.get('error', {}).get('message', submit_response.text)}"

        # Get the analysis ID from the submission response
        analysis_id = submit_data.get("data", [{}])[0].get("id")
        if not analysis_id:
            return "Error: No analysis ID returned from VirusTotal submission."

        # Step 2: Poll for the report
        report_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
        max_attempts = 10
        for attempt in range(max_attempts):
            report_response = requests.get(report_url, headers=headers)
            report_data = report_response.json()
            logger.debug(f"Report response (attempt {attempt + 1}): {report_data}")  # Debug log
            
            if report_response.status_code == 200 and report_data.get("data", [{}])[0].get("attributes", {}).get("status") == "completed":
                break
            time.sleep(2 ** attempt)  # Exponential backoff
        else:
            return "Error: Analysis timed out after multiple attempts"

        # Step 3: Parse the report
        attributes = report_data.get("data", [{}])[0].get("attributes", {})
        stats = attributes.get("stats", {})
        positives = stats.get("malicious", 0)
        total = stats.get("total", 0)
        analysis_date = attributes.get("date")

        result = f"VirusTotal Scan Result:\n- Malicious detections: {positives} out of {total}\n- Analysis date: {analysis_date}\n"
        if positives > 0:
            result += "- Details: Check VirusTotal for full report.\n"
        return result

    except Exception as e:
        return f"Error: {str(e)}"
    




    # # scanner/utils.py
# import subprocess
# import os

# # def run_nmap_scan(url):
# #     hostname = url.split("://")[1] if "://" in url else url
# #     try:
# #         nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
# #         return subprocess.check_output([nmap_path, "-F", hostname], text=True)
# #     except Exception as e:
# #         return f"Error: {str(e)}"
# def run_nmap_scan(url):
#     try:
#         from urllib.parse import urlparse
#         hostname = urlparse(url).hostname  # Extracts 'elearn.dbit.in'
#         if not hostname:
#             return "Error: Invalid URL"
#         nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"
#         return subprocess.check_output([nmap_path, "-F", hostname], text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"


# # def run_sqlmap_scan(url):
# #     try:
# #         sqlmap_path = r"C:\sqlmap\sqlmap.py"
# #         command = ["python", sqlmap_path, "-u", url, "--batch", "--dbs"]
# #         return subprocess.check_output(command, text=True)
# #     except Exception as e:
# #         return f"Error: {str(e)}"
    
# def run_sqlmap_scan(url, crawl_depth=2, use_forms=True):
#     try:
#         sqlmap_path = r"C:\sqlmap\sqlmap.py"
        
#         # Build command dynamically
#         command = [
#             "python", sqlmap_path,
#             "-u", url,
#             "--batch",
#             "--crawl", str(crawl_depth)
#         ]
        
#         if use_forms:
#             command.append("--forms")

#         # Optional: add `--output-dir` to save results
#         # command += ["--output-dir=output"]

#         # Run the command and capture both stdout and stderr
#         result = subprocess.run(
#             command,
#             capture_output=True,
#             text=True
#         )
        
#         # Check for errors
#         if result.returncode != 0:
#             return f"[!] SQLMap Error:\n{result.stderr}"
        
#         output = result.stdout

#         # Custom user-friendly interpretation
#         if "no parameter(s) found" in output:
#             return (
#                 "SQLMap ran successfully, but no injectable parameters were found.\n"
#                 "Tip: Try deeper crawling or ensure the URL has testable query parameters.\n\n"
#                 f"--- SQLMap Output ---\n{output}"
#             )
#         return output

#     except Exception as e:
#         return f"[!] Python Error: {str(e)}"



# def run_wapiti_scan(url):
#     try:
#         wapiti_path = r"C:\Users\nandu\AppData\Local\Programs\Python\Python312\Scripts\wapiti.exe"
#         command = [wapiti_path, "-u", url]
#         if not os.path.exists(wapiti_path):
#             return f"Error: Wapiti executable not found at {wapiti_path}"
#         result = subprocess.run(
#             command,
#             text=True,
#             capture_output=True,
#             check=True
#         )
#         return result.stdout
#     except subprocess.CalledProcessError as e:
#         return f"Error: Wapiti failed with exit code {e.returncode}: stdout: '{e.stdout}', stderr: '{e.stderr}'"
#     except Exception as e:
#         return f"Error: {str(e)}"