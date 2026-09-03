# test_client.py
import requests

# Base URL of your FastAPI server
url = "http://127.0.0.1:8000"

# Send custom headers
headers = {
    "x-api-key": "mysecret123",
    "User-Agent": "MyApp/2.0"
}

# Call secure endpoint
res = requests.get(f"{url}/secure-data", headers=headers)
print("Secure Data Response:", res.json())

# Get all headers
res = requests.get(f"{url}/all-headers", headers=headers)
print("All Headers Response:", res.json())

# Get user-agent specifically
res = requests.get(f"{url}/get-user-agent", headers=headers)
print("User-Agent Response:", res.json())
