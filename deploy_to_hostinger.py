import json
import os
import sys
import urllib.error
import urllib.request

API_TOKEN = "wP5ZOEwxgilyhsQ5Twi1QolWh3gFHdWBfT4uFy153b3cf07e"
USERNAME = "u247970256"
DOMAIN = "rajworklab.com"

print("1. Requesting fresh upload credentials from Hostinger API...")
url_endpoint = "https://developers.hostinger.com/api/hosting/v1/files/upload-urls"
req = urllib.request.Request(
    url_endpoint,
    data=json.dumps({"username": USERNAME, "domain": DOMAIN}).encode("utf-8"),
    headers={
        "Authorization": f"Bearer {API_TOKEN}",
        "Content-Type": "application/json",
        "User-Agent": "curl/8.7.1",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        upload_url = res_data["url"]
        auth_key = res_data["auth_key"]
        rest_auth_key = res_data["rest_auth_key"]
        print(f"✓ Upload credentials obtained successfully. Target: {upload_url}")
except Exception as e:
    print(f"✗ Failed to obtain upload credentials: {e}")
    sys.exit(1)


def upload_file(local_path, remote_path):
    size = os.path.getsize(local_path)
    with open(local_path, "rb") as f:
        data = f.read()

    endpoint = f"{upload_url}/{remote_path}?override=true"

    # Step 1: POST (Create / reserve file size)
    req1 = urllib.request.Request(
        endpoint,
        method="POST",
        headers={
            "X-Auth": auth_key,
            "X-Auth-Rest": rest_auth_key,
            "Tus-Resumable": "1.0.0",
            "Upload-Length": str(size),
            "Upload-Offset": "0",
            "User-Agent": "curl/8.7.1",
        },
    )
    try:
        with urllib.request.urlopen(req1) as res:
            pass
    except Exception as e:
        # 409 or already created
        pass

    # Step 2: PATCH (Upload file binary)
    req2 = urllib.request.Request(
        endpoint,
        data=data,
        method="PATCH",
        headers={
            "X-Auth": auth_key,
            "X-Auth-Rest": rest_auth_key,
            "Tus-Resumable": "1.0.0",
            "Content-Type": "application/offset+octet-stream",
            "Upload-Offset": "0",
            "User-Agent": "curl/8.7.1",
        },
    )
    try:
        with urllib.request.urlopen(req2) as res:
            print(f"✓ Uploaded {remote_path} ({size} bytes) -> HTTP {res.status}")
    except Exception as e:
        print(f"✗ Error uploading {remote_path}: {e}")


print("\n2. Uploading dist files to Hostinger public_html...")
for root, dirs, files in os.walk("dist"):
    for file in files:
        full_path = os.path.join(root, file)
        rel_path = os.path.relpath(full_path, "dist")
        upload_file(full_path, rel_path)

print("\n✓ Deployment to Hostinger public_html completed successfully!")
