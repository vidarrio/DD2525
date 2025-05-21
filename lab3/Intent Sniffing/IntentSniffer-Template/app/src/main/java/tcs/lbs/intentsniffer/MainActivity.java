package tcs.lbs.intentsniffer;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.location.Location;

public class MainActivity extends AppCompatActivity
{
    TextView LatitudeTextView, LongitudeTextView;
    LocationReceiver locationReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        LatitudeTextView = findViewById(R.id.LatitudeTextView);
        LongitudeTextView = findViewById(R.id.LongitudeTextView);

        LatitudeTextView.setText("Latitude: Waiting for data...");
        LongitudeTextView.setText("Longitude: Waiting for data...");

        // Initialize the receiver
        locationReceiver = new LocationReceiver();
    }

    @Override
    protected void onResume() {
        super.onResume();
        
        IntentFilter filter = new IntentFilter();
        
        filter.addAction("tcs.lbs.weather_app.WeatherBroadcastReceiver");
        filter.addAction("tcs.lbs.locationapp.MainActivityReceiver");
        
        // Register our receiver
        registerReceiver(locationReceiver, filter);
    }

    @Override
    protected void onPause() {
        super.onPause();
        // Unregister receiver to prevent leaks
        unregisterReceiver(locationReceiver);
    }

    // Inner class for the broadcast receiver
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
}