#!/usr/bin/env python3

import re
import subprocess
import time
from datetime import datetime, timedelta
import sys

# RTT data from the tables
CITY_RTT = {
    # Skyrim cities
    "Riften": 113,
    "Whiterun": 375,
    "Windhelm": 342,
    "Solitude": 312,
    "Markarth": 149,
    "Falkreath": 255,
    
    # Morrowind cities
    "Vivec": 247,
    "Mournhold": 345,
    "Balmora": 307,
    "Ald'ruhn": 128,
    "Blacklight": 387,
    "Narsis": 289,
    
    # Hammerfell cities
    "Sentinel": 157,
    "Rihad": 286,
    "Taneth": 336,
    "Elinhir": 305,
    "Dragonstar": 356,
    "Hegathe": 220,
    
    # Valenwood cities
    "Falinesti": 340,
    "Elden Root": 244,
    "Haven": 128,
    "Silvenar": 72,
    "Arenthia": 321,
    "Southpoint": 389,
    
    # Cyrodiil cities
    "Anvil": 209,
    "Bruma": 305,
    "Bravil": 260,
    "Chorrol": 189,
    "Leyawiin": 245,
    "Cheydinhal": 326,
    
    # Elsweyr cities
    "Rimmen": 129,
    "Riverhold": 336,
    "Orcrest": 302,
    "Dune": 285,
    "Senchal": 420,
    "Torval": 168
}

# Region RTT data
REGION_RTT = {
    "Skyrim": 803,
    "Morrowind": 384,
    "Hammerfell": 723,
    "Valenwood": 547,
    "Elsweyr": 427,
    "Cyrodiil": 1052
}

# Map cities to their regions
CITY_TO_REGION = {
    "Riften": "Skyrim", "Whiterun": "Skyrim", "Windhelm": "Skyrim", 
    "Solitude": "Skyrim", "Markarth": "Skyrim", "Falkreath": "Skyrim",
    
    "Vivec": "Morrowind", "Mournhold": "Morrowind", "Balmora": "Morrowind",
    "Ald'ruhn": "Morrowind", "Blacklight": "Morrowind", "Narsis": "Morrowind",
    
    "Sentinel": "Hammerfell", "Rihad": "Hammerfell", "Taneth": "Hammerfell",
    "Elinhir": "Hammerfell", "Dragonstar": "Hammerfell", "Hegathe": "Hammerfell",
    
    "Falinesti": "Valenwood", "Elden Root": "Valenwood", "Haven": "Valenwood",
    "Silvenar": "Valenwood", "Arenthia": "Valenwood", "Southpoint": "Valenwood",
    
    "Anvil": "Cyrodiil", "Bruma": "Cyrodiil", "Bravil": "Cyrodiil",
    "Chorrol": "Cyrodiil", "Leyawiin": "Cyrodiil", "Cheydinhal": "Cyrodiil",
    
    "Rimmen": "Elsweyr", "Riverhold": "Elsweyr", "Orcrest": "Elsweyr",
    "Dune": "Elsweyr", "Senchal": "Elsweyr", "Torval": "Elsweyr"
}

USERNAMES = {
    "001": "Eadric",
    "002": "Nalena",
    "003": "Kaelen"
}

def start_logcat_capture():
    """Start capturing logcat output"""
    try:
        # Clear existing logs
        subprocess.run(["adb", "logcat", "-c"], check=True)
        print("Log buffer cleared")
        
        # Start capturing AppLog logs
        process = subprocess.Popen(
            ["adb", "logcat", "-s", "AppLog"],
            stdout=subprocess.PIPE,
            text=True,
            bufsize=1
        )
        return process
    except subprocess.SubprocessError as e:
        print(f"Error starting logcat capture: {e}")
        return None

def parse_log_line(line):
    """Parse a single log line and extract timing information"""
    try:
        user_match = re.search(r"User:(\w+)", line)
        type_match = re.search(r"Type:(\w+)", line)
        message_match = re.search(r"Message:(.*?) ;", line)
        msg_id_match = re.search(r"MessageID:(\d+)", line)
        time_match = re.search(r"Time:(\d+:\d+:\d+\.\d+)", line)
        
        if user_match and type_match and message_match and msg_id_match and time_match:
            return {
                "user": user_match.group(1),
                "type": type_match.group(1),
                "message": message_match.group(1),
                "msg_id": msg_id_match.group(1),
                "time": time_match.group(1)
            }
        return None
    except Exception as e:
        print(f"Error parsing log line: {e}")
        print(f"Line: {line}")
        return None

def calculate_timing(logs):
    """Calculate timing between different events for each message"""
    messages = {}
    
    for log in logs:
        msg_id = log["msg_id"]
        user_id = log["user"]
        log_type = log["type"]
        
        # Create a unique key combining user ID and message ID
        unique_key = f"{user_id}_{msg_id}"
        
        if unique_key not in messages:
            messages[unique_key] = {"message": log["message"], "user": user_id}
            
        if log_type == "new_msg":
            messages[unique_key]["sent_time"] = datetime.strptime(log["time"], "%H:%M:%S.%f")
        elif log_type == "server_ack":
            messages[unique_key]["server_time"] = datetime.strptime(log["time"], "%H:%M:%S.%f")
        elif log_type == "receiver_ack":
            messages[unique_key]["receiver_time"] = datetime.strptime(log["time"], "%H:%M:%S.%f")
    
    # Calculate timings
    timing_results = []
    for unique_key, data in messages.items():
        if "sent_time" in data and "server_time" in data:
            server_delay = (data["server_time"] - data["sent_time"]).total_seconds() * 1000  # convert to ms
            
            if "receiver_time" in data:
                receiver_delay = (data["receiver_time"] - data["server_time"]).total_seconds() * 1000  # convert to ms
                total_rtt = (data["receiver_time"] - data["sent_time"]).total_seconds() * 1000  # convert to ms
            else:
                receiver_delay = None
                total_rtt = None
                
            timing_results.append({
                "unique_key": unique_key,
                "msg_id": unique_key.split("_")[1],  # Extract original msg_id
                "message": data["message"],
                "user": data["user"],
                "server_delay": server_delay,
                "receiver_delay": receiver_delay,
                "total_rtt": total_rtt
            })
    
    return timing_results

def identify_location(total_rtt, server_delay=None, receiver_delay=None):
    # Step 1: Find the best matching region based on server delay
    best_region = None
    min_region_difference = float('inf')
    
    for region, region_rtt in REGION_RTT.items():
        difference = abs(server_delay - region_rtt)
        
        if difference < min_region_difference:
            min_region_difference = difference
            best_region = region
    
    # Step 2: Find the best matching city in the identified region
    best_city_match = None
    min_city_difference = float('inf')
    
    for city, city_rtt in CITY_RTT.items():
        if CITY_TO_REGION[city] != best_region:
            continue
        
        # Receiver delay should approximate the city RTT
        difference = abs(receiver_delay - city_rtt)
        
        if difference < min_city_difference:
            min_city_difference = difference
            best_city_match = {
                "city": city,
                "region": best_region,
                "city_rtt": city_rtt,
                "region_rtt": REGION_RTT[best_region],
                "estimated_total_rtt": REGION_RTT[best_region] + city_rtt,
                "region_difference": min_region_difference,
                "city_difference": difference,
                "rtt_difference": abs((REGION_RTT[best_region] + city_rtt) - total_rtt)
            }
    
    return best_city_match

def process_logs_realtime():
    """Process logcat output in real-time with user location tracking"""
    process = start_logcat_capture()
    if not process:
        return
    
    print("Starting log capture. Press Ctrl+C to stop...")
    logs = []
    user_locations = {}  # Track locations by user ID
    
    try:
        for line in process.stdout:
            log_data = parse_log_line(line.strip())
            if log_data:
                logs.append(log_data)
                
                # Print parsed log data
                msg_type = log_data["type"]
                msg_id = log_data["msg_id"]
                message = log_data["message"]
                print(f"[{msg_type}] ID:{msg_id} - {message}")
                
                # If we have enough data for an analysis, do it
                timings = calculate_timing(logs)
                
                # Update location info for messages with complete timing
                for timing in timings:
                    user_id = timing["user"]
                    if timing["total_rtt"] is not None and timing["total_rtt"] > 0:
                        location = identify_location(
                                                                    timing["total_rtt"], 
                                                                    timing["server_delay"], 
                                                                    timing["receiver_delay"]
                                                                )
                        if location:
                            # Only report if this is a new location for this user
                            # or it's the first time we've seen this user
                            is_new_user = user_id not in user_locations
                            is_new_location = is_new_user or user_locations[user_id]["city"] != location["city"]
                            
                            if is_new_location:
                                user_locations[user_id] = {
                                    "city": location["city"],
                                    "region": location["region"],
                                    "message": timing["message"],
                                    "rtt": timing["total_rtt"]
                                }
                                
                                print(f"\n🔍 {'LOCATION FOUND' if is_new_user else 'LOCATION CHANGE'} for User: {USERNAMES[user_id]}")
                                print(f"  📍 City: {location['city']} ({location['region']})")
                                print(f"  ⏱  Measured RTT: {timing['total_rtt']:.1f}ms")
                                print(f"  ⏱  Expected RTT: {location['city_rtt']}ms (±{location['rtt_difference']:.1f}ms)")
                                print(f"  🌐 Regional RTT: {location['region_rtt']}ms\n")
                                
                                print(f" === MESSAGE DETAILS ===")
                                print(f"  ⏱ Sender delay: {timing['server_delay']:.1f}ms")
                                print(f"  ⏱ Receiver delay: {timing['receiver_delay']:.1f}ms\n")
    
    except KeyboardInterrupt:
        print("\nCapture stopped by user.")
    finally:
        process.terminate()
        
        # Print final report
        print("\n====== TIMING ANALYSIS REPORT ======")
        print("\n=== USER LOCATIONS ===")
        for user_id, location in user_locations.items():
            print(f"User {user_id}: {location['city']} in {location['region']} (RTT: {location['rtt']:.1f}ms)")
            
        print("\n=== MESSAGE DETAILS ===")
        timings = calculate_timing(logs)
        
        for timing in timings:
            print(f"\nMessage: '{timing['message']}'")
            print(f"  User: {USERNAMES[timing['user']]}")
            print(f"  Server delay: {timing['server_delay']:.1f}ms")
            
            if timing["receiver_delay"] is not None:
                print(f"  Receiver delay: {timing['receiver_delay']:.1f}ms")
                print(f"  Total RTT: {timing['total_rtt']:.1f}ms")
                
                if timing["total_rtt"] > 0:  # Ignore negative RTTs
                    location = identify_location(
                                                    timing["total_rtt"], 
                                                    timing["server_delay"], 
                                                    timing["receiver_delay"]
                                                )
                    if location:
                        print(f"  Likely location: {location['city']} in {location['region']}")
                        confidence = 100 - min(99, (location['rtt_difference'] / location['city_rtt'] * 100))
                        print(f"  Location confidence: {max(1, confidence):.1f}%")
            else:
                print("  Receiver acknowledgment not received")

if __name__ == "__main__":
    process_logs_realtime()