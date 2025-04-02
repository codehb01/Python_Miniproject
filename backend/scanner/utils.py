# # # # scanner/utils.py
# # # import subprocess

# # # def run_nmap_scan(url):
# # #     hostname = url.split("://")[1] if "://" in url else url
# # #     try:
# # #         return subprocess.check_output(["nmap", "-F", hostname], text=True)
# # #     except Exception as e:
# # #         return f"Error: {str(e)}"

# # # def run_nikto_scan(url):
# # #     try:
# # #         return subprocess.check_output(["nikto", "-h", url], text=True)
# # #     except Exception as e:
# # #         return f"Error: {str(e)}"
# # scanner/utils.py
# import subprocess

# def run_nmap_scan(url):
#     hostname = url.split("://")[1] if "://" in url else url
#     try:
#         # Specify the full path to nmap
#         nmap_path = r"C:\Program Files (x86)\Nmap\nmap.exe"  # Adjust this path if Nmap is installed elsewhere
#         return subprocess.check_output([nmap_path, "-F", hostname], text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"

# # def run_nikto_scan(url):
# #     try:
# #         # Specify the full path to perl and nikto.pl
# #         perl_path = r"C:\Strawberry\perl\bin\perl.exe"  # Adjust this path based on your Perl installation
# #         nikto_path = r"C:\Users\nandu\nikto\program\nikto.pl"  # Adjust this path based on your Nikto installation
# #         return subprocess.check_output([perl_path, nikto_path, "-h", url], text=True)
# #     except Exception as e:
# #         return f"Error: {str(e)}"

# def run_sqlmap_scan(url):
#     try:
#         # Specify the full path to sqlmap.py
#         sqlmap_path = r"C:\sqlmap\sqlmap.py"  # Adjust this path based on your SQLMap installation
#         command = ["python", sqlmap_path, "-u", url, "--batch", "--dbs"]
#         # --batch: Run in non-interactive mode
#         # --dbs: Enumerate database names if SQL injection is found
#         return subprocess.check_output(command, text=True)
#     except Exception as e:
#         return f"Error: {str(e)}"


# scanner/utils.py
import subprocess

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
        command = ["wapiti", "-u", url]
        return subprocess.check_output(command, text=True)
    except Exception as e:
        return f"Error: {str(e)}"