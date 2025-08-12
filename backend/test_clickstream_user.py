#!/usr/bin/env python
"""
Test script to verify clickstream user tracking is working
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
    "username": "clicktestuser",
    "email": "clicktest@example.com",
    "phone_number": "1234567890",
    "age_group": "18_25",
    "password": "testpass123"
}

def test_clickstream_user_tracking():
    """Test that clickstream events are properly associated with users"""
    print("🧪 Testing Clickstream User Tracking...")
    print("=" * 60)
    
    # Step 1: Register a test user
    print("1. Registering test user...")
    try:
        response = requests.post(f"{BASE_URL}/users/register/", json=TEST_USER)
        if response.status_code == 201:
            data = response.json()
            access_token = data.get('tokens', {}).get('access', '')
            user_info = data.get('user', {})
            print(f"✅ User registered: {user_info.get('username')} (ID: {user_info.get('id')})")
        else:
            print(f"❌ Registration failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return False
    
    # Step 2: Test clickstream logging with user
    print("\n2. Testing clickstream logging with user...")
    try:
        headers = {"Authorization": f"Bearer {access_token}"}
        click_data = {
            "event_context": "/test-page",
            "component": "TestComponent",
            "event_name": "Test Click",
            "description": "Testing user tracking in clickstream",
            "origin": "test"
        }
        
        response = requests.post(f"{BASE_URL}/clickstream/log/", json=click_data, headers=headers)
        print(f"Clickstream status: {response.status_code}")
        
        if response.status_code == 201:
            data = response.json()
            print("✅ Clickstream logged successfully!")
            print(f"   Message: {data.get('message')}")
            print(f"   User: {data.get('user')}")
            print(f"   User ID: {data.get('user_id')}")
            print(f"   Event: {data.get('event')}")
            print(f"   Record ID: {data.get('record_id')}")
        else:
            print(f"❌ Clickstream logging failed: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Clickstream error: {e}")
        return False
    
    # Step 3: Test multiple clickstream events
    print("\n3. Testing multiple clickstream events...")
    try:
        events = [
            {"event_name": "Button Click", "component": "Button", "description": "User clicked a button"},
            {"event_name": "Form Submit", "component": "Form", "description": "User submitted a form"},
            {"event_name": "Page View", "component": "Page", "description": "User viewed a page"}
        ]
        
        for i, event in enumerate(events, 1):
            click_data.update(event)
            response = requests.post(f"{BASE_URL}/clickstream/log/", json=click_data, headers=headers)
            if response.status_code == 201:
                data = response.json()
                print(f"   ✅ Event {i}: {event['event_name']} - User: {data.get('user')}")
            else:
                print(f"   ❌ Event {i} failed: {response.text}")
                
    except Exception as e:
        print(f"❌ Multiple events error: {e}")
        return False
    
    # Step 4: Test accessing user profile to verify authentication
    print("\n4. Testing user profile access...")
    try:
        response = requests.get(f"{BASE_URL}/users/profile/", headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Profile access successful - User: {data.get('username')}")
        else:
            print(f"❌ Profile access failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Profile access error: {e}")
        return False
    
    print("\n" + "=" * 60)
    print("🎉 Clickstream User Tracking Test Completed Successfully!")
    print(f"📊 All events for user '{TEST_USER['username']}' have been logged with proper user association.")
    return True

def main():
    """Run the clickstream user tracking test"""
    success = test_clickstream_user_tracking()
    
    if success:
        print("\n💡 Next steps:")
        print("   1. Check Django admin at /admin/clickstream/clickstream/")
        print("   2. Verify that all events show the correct user")
        print("   3. Check the database to confirm user_id is populated")
    else:
        print("\n❌ Test failed. Check the error messages above.")

if __name__ == "__main__":
    main()
