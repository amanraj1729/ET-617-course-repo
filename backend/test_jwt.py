#!/usr/bin/env python
"""
Simple test script to verify JWT authentication is working
"""
import os
import django
import requests
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'learning_platform.settings')
django.setup()

# Test configuration
BASE_URL = "http://localhost:8000/api"
TEST_USER = {
    "username": "testuser",
    "email": "test@example.com",
    "phone_number": "1234567890",
    "age_group": "18_25",
    "password": "testpass123"
}

def test_registration():
    """Test user registration"""
    print("Testing user registration...")
    try:
        response = requests.post(f"{BASE_URL}/users/register/", json=TEST_USER)
        print(f"Registration status: {response.status_code}")
        if response.status_code == 201:
            data = response.json()
            print("✅ Registration successful!")
            print(f"User: {data.get('user', {}).get('username')}")
            print(f"Access token: {data.get('tokens', {}).get('access', '')[:20]}...")
            return data.get('tokens', {}).get('access', '')
        else:
            print(f"❌ Registration failed: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None

def test_login():
    """Test user login"""
    print("\nTesting user login...")
    try:
        login_data = {
            "username": TEST_USER["username"],
            "password": TEST_USER["password"]
        }
        response = requests.post(f"{BASE_URL}/users/login/", json=login_data)
        print(f"Login status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ Login successful!")
            print(f"User: {data.get('user', {}).get('username')}")
            print(f"Access token: {data.get('tokens', {}).get('access', '')[:20]}...")
            return data.get('tokens', {}).get('access', '')
        else:
            print(f"❌ Login failed: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Login error: {e}")
        return None

def test_clickstream_logging(access_token):
    """Test clickstream logging with authentication"""
    print("\nTesting clickstream logging...")
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        click_data = {
            "event_context": "/test",
            "component": "TestComponent",
            "event_name": "Test Click",
            "description": "Test clickstream event",
            "origin": "test"
        }
        response = requests.post(f"{BASE_URL}/clickstream/log/", json=click_data, headers=headers)
        print(f"Clickstream status: {response.status_code}")
        if response.status_code == 201:
            data = response.json()
            print("✅ Clickstream logging successful!")
            print(f"Message: {data.get('message')}")
            print(f"User: {data.get('user')}")
            print(f"Event: {data.get('event')}")
        else:
            print(f"❌ Clickstream logging failed: {response.text}")
    except Exception as e:
        print(f"❌ Clickstream error: {e}")

def test_protected_endpoint(access_token):
    """Test accessing a protected endpoint"""
    print("\nTesting protected endpoint access...")
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(f"{BASE_URL}/users/profile/", headers=headers)
        print(f"Profile access status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print("✅ Protected endpoint access successful!")
            print(f"User profile: {data}")
        else:
            print(f"❌ Protected endpoint access failed: {response.text}")
    except Exception as e:
        print(f"❌ Protected endpoint error: {e}")

def main():
    """Run all tests"""
    print("🚀 Starting JWT Authentication Tests...")
    print("=" * 50)
    
    # Test registration
    access_token = test_registration()
    
    if not access_token:
        # If registration failed, try login
        access_token = test_login()
    
    if access_token:
        # Test clickstream logging
        test_clickstream_logging(access_token)
        
        # Test protected endpoint
        test_protected_endpoint(access_token)
        
        print("\n" + "=" * 50)
        print("✅ All tests completed!")
    else:
        print("\n❌ No access token obtained. Tests failed.")

if __name__ == "__main__":
    main()
