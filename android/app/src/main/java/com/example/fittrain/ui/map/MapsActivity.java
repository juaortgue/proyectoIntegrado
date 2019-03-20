package com.example.fittrain.ui.map;

import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.Toast;

import com.example.fittrain.R;
import com.example.fittrain.model.GymResponse;
import com.example.fittrain.model.ResponseContainer;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.GymService;
import com.example.fittrain.ui.gym.MyGymRecyclerViewAdapter;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private static final String TODO = "";
    private GoogleMap mMap;
    private GymService gymService;
    private FusedLocationProviderClient fusedLocationClient;
    private Marker myMarker;
    private Map options = new HashMap();
    private List<GymResponse> gymsList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        Intent i = getIntent();
        options = (Map) i.getSerializableExtra("options");
    }



    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        loadGyms();









        // Add a marker in Sydney and move the camera
        /*LatLng sydney = new LatLng(-34, 151);
        mMap.addMarker(new MarkerOptions().position(sydney).title("Marker in Sydney"));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));*/
    }
    public void loadGyms(){
        gymService= ServiceGenerator.createService(GymService.class);

        Call<ResponseContainer<GymResponse>> call = gymService.listAll(options);
        call.enqueue(new Callback<ResponseContainer<GymResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<GymResponse>> call, Response<ResponseContainer<GymResponse>> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getApplicationContext(), "Error in request", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("successful response", "code error");

                    gymsList = response.body().getRows();
                    markGymList();

                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<GymResponse>> call, Throwable t) {
                Log.e("failure", "failure in petition");
            }
        });
    }
    public void markGymList(){
        for (GymResponse g : gymsList){
            if (g.getPosition()==null){
                String lat = "37.3803677";
                String lon = "-6.0071807999999995";
                LatLng loc = new LatLng(Double.parseDouble(lat),Double.parseDouble(lon));
                mMap.addMarker(new MarkerOptions().position(loc).title("Marker in "+g.getAddress()));
                mMap.moveCamera(CameraUpdateFactory.newLatLng(loc));
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(loc, 8));
            }else{
                String[] parts = g.getPosition().split(",");
                if (parts.length==1){
                    String lat = "37.3803677";
                    String lon = "-6.0071807999999995";
                    LatLng loc = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));
                    mMap.addMarker(new MarkerOptions().position(loc).title("Marker in " + g.getAddress()));
                    mMap.moveCamera(CameraUpdateFactory.newLatLng(loc));
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(loc, 8));
                } else{
                    String lat = parts[0];
                    String lon = parts[1];

                    LatLng loc = new LatLng(Double.parseDouble(lat), Double.parseDouble(lon));

                    mMap.addMarker(new MarkerOptions().position(loc).title("Marker in " + g.getAddress())).setTag(g.getId());

                    mMap.setOnMarkerClickListener(marker -> {
                        //TODO AQUI TE MANDA A SU DETAIL
                        /*Intent details = new Intent(getApplicationContext(), DetailsActivity.class);
                        details.putExtra("property", Objects.requireNonNull(marker.getTag()).toString());
                        startActivity(details);*/
                        return false;
                    });
                    mMap.moveCamera(CameraUpdateFactory.newLatLng(loc));
                    mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(loc, 8));
                }
            }
        }
    }
}
