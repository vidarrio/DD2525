# Report for Lab 3: Android Security

## Intent Sniffing
### How does the broadcast system work?
The broadcast system in Android allows applications to send and receive messages across different components of the system. It is a way for applications to communicate with each other without needing to be directly connected. The system uses a publish-subscribe model, where applications can register to listen for specific intents (messages) and respond when those intents are broadcasted.

Some use cases for implicit broadcasts include:
- Sending a message to all applications when the device is charging or unplugged.
- Notifying applications when the device's screen is turned on or off.
- Informing applications about changes in network connectivity.
- Airplane mode changes.
- Sending location updates to interested applications.
- Sending a message when the device is booted up.

When an application wants to send a broadcast, it creates an `Intent` object and calls the `sendBroadcast()` method. Other applications can register to listen for these broadcasts by declaring a `BroadcastReceiver` in their manifest file or by registering it at runtime. When the broadcast is sent, the system delivers it to all registered receivers that match the intent's action and data.

### How we get the broadcast intents
Firstly, we created a receiver class called ´LocationReceiver´ that extends the ´BroadcastReceiver´ class. This class overrides the ´onReceive´ method, which is called when the broadcast is received. Inside this method, we extract and apply the location from the found intent to the TextViews.

```java
private class LocationReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (intent != null) {
            // Extract the Location object
            Location location = intent.getParcelableExtra("Location");
            if (location != null) {
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                
                // Show them in TextViews
                LatitudeTextView.setText("Latitude: " + latitude);
                LongitudeTextView.setText("Longitude: " + longitude);
            }
        }
    }
}
```

We then registered the receiver in the ´onCreate´ method with intent filters for the actions we want to listen to. In this case, we checked for the relevant addresses to filter in the Location application.

The adresses where:
- `tcs.lbs.weather_app.WeatherBroadcastReceiver` for the inter-app broadcast
- `tcs.lbs.locationapp.MainActivityReceiver` for the intra-app broadcast

```java
@Override
protected void onResume() {
    super.onResume();
    
    IntentFilter filter = new IntentFilter();
    
    filter.addAction("tcs.lbs.weather_app.WeatherBroadcastReceiver");
    filter.addAction("tcs.lbs.locationapp.MainActivityReceiver");
    
    registerReceiver(locationReceiver, filter);
}
```

We then tried to comment out each filter individually to test both intra and inter-app broadcasts.

### Solution to prevent intra-app sniffing
Two potential solutions to prevent intra-app sniffing are:
1. **Use LocalBroadcastManager**: Instead of using the global broadcast system, we can use `LocalBroadcastManager` to send broadcasts within the same application. This restricts the broadcast to only the components of the same application, preventing other applications from receiving it. LocalBroadcastManager is however deprecated and should not be used in new applications. Potential alternative methods could be to use `LiveData` or `ViewModel` to communicate between components within the same application.
2. **Use Permissions**: We can define custom permissions in the manifest file and require those permissions for the broadcast receiver. This way, only applications that have been granted the specific permission can receive the broadcast.


### Implementation of LocalBroadcastManager
To implement `LocalBroadcastManager`, we need to change three files in the LocationApp project:
1. ForegroundLocationService.java
2. MainActivity.java
3. gradle.build

#### ForegroundLocationService.java
In the `ForegroundLocationService.java` file, we need to import the `LocalBroadcastManager` and use it to send the broadcast instead of the global broadcast system. We also need to change the intent action to a custom action.

```java
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
```

Then we need to change the `sendBroadcast` method to use `LocalBroadcastManager`:

Original code:
```java
sendBroadcast(locationAppIntent);
```

Modified code:
```java
LocalBroadcastManager.getInstance(this).sendBroadcast(locationAppIntent);
```

#### MainActivity.java
In the `MainActivity.java` file, we need to import the `LocalBroadcastManager`(like above) and register the receiver using it.

original code:
```java
registerReceiver(new MainActivityReceiver(), filter);
```

Modified code:
```java
LocalBroadcastManager.getInstance(this).registerReceiver(mainActivityReceiver, filter);
```

#### build.gradle
In the `build.gradle` file, we need to first add the dependency for `LocalBroadcastManager`:

```groovy
dependencies {
    implementation "androidx.localbroadcastmanager:localbroadcastmanager:1.1.0"
    // other dependencies...
}
```

Then we need to change the `compileSdkVersion` to 31 or higher to use the latest version of `LocalBroadcastManager`:

```groovy
android {
    compileSdkVersion 31
    // other configurations...
}
```

### Why we can sniff inter-app broadcasts
Inter-app broadcasts can be sniffed because they are sent using the global broadcast system, which allows any application to listen for broadcasts that match the intent's action and data. This means that if an application registers a `BroadcastReceiver` with the same action as the broadcast being sent, it can receive that broadcast even if it is not the intended recipient. They are by design simpler to listen to, as they are ment to be used for communication between different applications. This is a feature of the Android system that allows for flexibility and interoperability between applications. However, it also means that sensitive information can be exposed if not properly secured.

### Solution to prevent inter-app sniffing
Two solutions to prevent inter-app sniffing are:
1. **Use Permissions**: We can define custom permissions in the manifest file and require those permissions for the broadcast receiver. This way, only applications that have been granted the specific permission can receive the broadcast.
2. **Use Package Targeting**: We can explicitly direct broadcasts to only the intended receiving application using the setPackage() method when creating the Intent. This ensures that even if other applications register for the same action, they will not receive our broadcasts.



### Implementation of permissions
To implement permissions, we need to make changes to three files. Two in the location app and one in the weather app:
1. AndroidManifest.xml in the location app
2. AndroidManifest.xml in the weather app
3. ForegroundLocationService.java in the location app

#### AndroidManifest.xml in the location app
In the `AndroidManifest.xml` file of the location app, we need to define a custom permission and require it for the broadcast receiver.

We need to add the following permission inside the `<manifest>` tag:
```xml
<permission
        android:name="tcs.lbs.permission.RECEIVE_LOCATION"
        android:protectionLevel="signature" />
```

#### AndroidManifest.xml in the weather app
In the `AndroidManifest.xml` file of the weather app, we need to declare that it uses the custom permission defined in the location app.

We need to add the following inside the `<manifest>` tag:
```xml
<uses-permission android:name="tcs.lbs.permission.RECEIVE_LOCATION" />
```

#### ForegroundLocationService.java in the location app
In the `ForegroundLocationService.java` file, we need to require the custom permission for the broadcast receiver.

original code:
```java
sendBroadcast(weatherIntent);
```

Modified code:
```java
sendBroadcast(weatherIntent, "tcs.lbs.permission.RECEIVE_LOCATION");
```

This way, only applications that have been granted the `tcs.lbs.permission.RECEIVE_LOCATION` permission can receive the broadcast.

## Confused Deputy
### How does the confused deputy attack work?
The confused deputy attack is a type of security vulnerability that occurs when a program (the deputy) is given permission to perform actions on behalf of another program (the client). The deputy is confused because it does not know the true identity of the client and may inadvertently perform actions that the client did not intend or authorize.

This can happen when the deputy has more privileges than the client, allowing it to access resources or perform actions that the client should not be able to do. The attack typically involves tricking the deputy into performing an action on behalf of the attacker, who may not have the same level of privileges.

### Functionality of DatabaseActivity
DatabaseActivity is a class that serves as a database operation handler in the Android application. It functions as an intermediary between the application and the database, allowing the application to perform various operations such as inserting, updating, deleting, and querying data in the database through reading intent.

### Root cause of the confused deputy attack
Because the class `DatabaseActivity` only reads the intent and does not check the sender, it is vulnerable to the confused deputy attack. This means that if an attacker can send a malicious intent to DatabaseActivity, they can perform unauthorized operations on the database, such as deleting or modifying data.

### How to prevent the confused deputy attack
Here are two potential solutions to prevent the confused deputy attack:
1. **Mark the receiver as exported=false**: By marking the receiver as `exported=false` in the manifest file, we can prevent other applications from sending intents to it. This way, only the application itself can send intents to the receiver, reducing the risk of unauthorized access.
2. **Use permissions**: We can define custom permissions in the manifest file and require those permissions for the broadcast receiver. This way, only applications that have been granted the specific permission can send intents to the receiver.

#### Marking the receiver as exported=false pros and cons
Pros:
- Simple to implement and understand.
- Provides a quick way to restrict access to the receiver.

Cons:
- May limit the functionality of the application if other components need to communicate with the receiver.


#### Using permissions pros and cons
Pros:
- Provides a more flexible and secure way to control access to the receiver.
- Allows for fine-grained control over which applications can send intents to the receiver.

Cons:
- More complex to implement and manage.

### Implementation of **Mark the receiver as exported=false** solution
To implement the solution of marking the receiver as `exported=false`, we need to make changes to the `AndroidManifest.xml` file of the Notes app.

Before:
```xml
<activity
    android:name=".DataBaseActivity"
    android:theme="@android:style/Theme.NoDisplay">
    <intent-filter>
        <action android:name="tcs.lbs.notes.DataBaseManager"/>
    </intent-filter>
</activity>
```

After:
```xml
<activity
    android:name=".DataBaseActivity"
    android:exported="false"
    android:theme="@android:style/Theme.NoDisplay">
    <intent-filter>
        <action android:name="tcs.lbs.notes.DataBaseManager"/>
    </intent-filter>
</activity>
```

This way, the `DataBaseActivity` will not be accessible to other applications, preventing the confused deputy attack.

## Leaky Content Provider
### How is the content provider used and why do we use it in this senario?
Content providers are standardized components in Android that allow applications to share data with each other. They provide a way to access and manipulate data stored in a structured format, such as a database or file system, using a uniform interface. In this scenario, the content provider is used to share text files of notes from the Notes app with other applications. However, due to improper path validation, this content provider can be exploited to access arbitrary files on the device's storage, demonstrating a classic path traversal vulnerability.

### What is the issue with this implementation?
The issue with this implementation of the content provider in the `FileProvider` class for the Notes app is that it does not properly validate the file paths being accessed. This allows an attacker to exploit the content provider with the use of the "path traversal" vulnerability, which enables them to access files outside of the intended directory. By manipulating the file path in the URI, an attacker can potentially read sensitive files on the device, leading to unauthorized access to data.

### Implementation of **queryContentProvider_onClicked** method
The `queryContentProvider_onClicked` method is responsible for querying the content provider and retrieving the data from the specified URI. In this case, it is used to access a text file within the sdcard that potentially contains sensitive information.

Firstly, we set the URI to the content provider based on the filename provided by the user. The URI is constructed using the content provider's authority and the file path:
```java
    Uri fileUri = Uri.parse("content://tcs.lbs.notes/../../../../../../sdcard/" + filename);
```

The `Uri` is constructed using the content provider's authority (`tcs.lbs.notes`) and the file path. The `../../../../../../sdcard/` part is used to traverse up the directory structure, allowing access to files outside of the intended directory. The `content://` scheme indicates that we are accessing a content provider.

Then we simply use an `InputStream` to read the data from the content provider:
```java
    InputStream is = getContentResolver().openInputStream(fileUri);
```

Finally, we read the data from the `InputStream` and display it in a `TextView`:
```java
    BufferedReader reader = new BufferedReader(new InputStreamReader(is));
    String line;
    while ((line = reader.readLine()) != null) {
        result.append(line).append("\n");
    }
    reader.close();
    is.close();
    // Display the result if successful
    resultTextView.setText(result.toString());
```

### Solution to prevent the leaky content provider
This could be solved by implementing proper path validation in the `FileProvider` class. We can validate that the file path does not contain any traversal characters for going above the intended directory. This can be done by checking if the file path starts with the intended directory and does not contain any `../` or `..\` characters. If a malicious path is detected, we can just return null or throw an exception.

```java
if (path.contains("../") || path.contains("..\\")) {
            return null;
}
```

This way, we can prevent unauthorized access to files outside of the intended directory atleast in this example and protect sensitive data from being exposed. Using a more propper path validation method would be better to prevent alternative path traversal attacks.

## Timing Attacks on Messengers
### Finding the users locations
We created a python script that both gets the timing of messages and then prints both the time and the location of the user. The script `GetLocation.py` uses the `subprocess` module to run the `adb` command and get the output of the `logcat` command. It then parses the output to extract the time and location of the user when a log appears and is not the same as the previously logged location. The script uses a regular expression to match the log format and extract the relevant information.

```
User:001 ; Type:new_msg ; Message:1 ; MessageID:1 ; Time:12:40:19.833
User:001 ; Type:server_ack ; Message:1 ; MessageID:1 ; Time:12:40:20.455
User:001 ; Type:receiver_ack ; Message:1 ; MessageID:1 ; Time:12:40:20.746
```

All the information from the logs are then stored in a dictionary, where the unique key is the user ID combined with the message ID. Once all the information is collected, we use it to identify the location of the user. The regions and cities, as well as their round trip times(RTT), are stored in dictionaries based on the tables given in the lab instructions. The script then uses the RTT to determine the location of the user based on the what region and city matches the RTTs.

### Difficulties of using this method in the real world
There are several difficulties in using this method in the real world:
- Applications like WhatsApp and Signal have many different servers and do not always make it clear where the servers are located. This makes it difficult to determine the exact location of the user based on the RTT.
- The RTT can vary based on network conditions, making it difficult to accurately determine the location of the user.
- Getting accurate timings about the messages can be difficult, as the specific timing of the messages may not be logged in any way that can be useful.
- These services might use countermessures to prevent timing attacks, such as randomizing the timing of messages or normalizing the timings.

### How to prevent timing attacks
To prevent timing attacks, we can implement several countermeasures(Here are two examples):
1. **Use randomized delays**: By introducing random delays in the sending and receiving of messages, we can make it more difficult for an attacker to determine the timing of messages and the location of users.
2. **Normalize message timings**: By normalizing the timings of messages, we can make it more difficult for an attacker to determine the timing of messages and the location of users. This can be done by introducing a fixed delay between messages or by using a fixed interval for sending and receiving messages.

#### Pros and cons of the solutions
- **Randomized delays**:
  - Pros: Makes it difficult for an attacker to determine the timing of messages and the location of users.
  - Cons: Can introduce latency in message delivery and may affect user experience.

- **Normalized message timings**:
    - Pros: Makes it difficult for an attacker to determine the timing of messages and the location of users.
    - Cons: Can introduce latency in message delivery and may affect user experience. Additionally, it may not be as effective against more sophisticated attacks that can still analyze the timing patterns.