package com.example.fittrain.ui.gym;

import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.model.GymResponse;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.GymService;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class GymDetailsActivity extends AppCompatActivity implements OnMapReadyCallback {
    private TextView textViewTitlePriceDetail, textViewAddressDetail,
    textViewProvinceCityZipcodeDetail, textViewDescriptionGymDetail;
    private MapView mapViewDetail;
    private GoogleMap mMap;
    private GoogleMap gmap;
    private ImageView imageViewPictureGymDetail;
    private GymService service;
    private static final String MAP_VIEW_BUNDLE_KEY = "MapViewBundleKey";
    private String id;
    private GymResponse gym;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gym_details);
        loadItems();
        Bundle mapViewBundle = null;
        if (savedInstanceState != null) {
            mapViewBundle = savedInstanceState.getBundle(MAP_VIEW_BUNDLE_KEY);
        }
        mapViewDetail = findViewById(R.id.mapView);
        mapViewDetail.onCreate(mapViewBundle);
        mapViewDetail.getMapAsync(this);
        loadGym();
    }
    public void loadItems(){
        textViewTitlePriceDetail=findViewById(R.id.textViewNamePriceGymDetail);
        textViewAddressDetail=findViewById(R.id.textViewAddresGymDetail);
        textViewProvinceCityZipcodeDetail=findViewById(R.id.textViewProvinceCityZipcodeDetailGym);
        id = getIntent().getExtras().getString("id");
        imageViewPictureGymDetail = findViewById(R.id.imageViewPictureGym);
        textViewDescriptionGymDetail = findViewById(R.id.textViewDescriptionDetailGym);

    }
    public void setItems(){
        textViewTitlePriceDetail.setText(gym.getName()+", "+gym.getPrice()+"€");
        textViewAddressDetail.setText(gym.getAddress());
        textViewProvinceCityZipcodeDetail.setText(gym.getCity()+", "+gym.getProvince()+", "+gym.getZipcode());
        textViewDescriptionGymDetail.setText(gym.getDescription());
        if (gym.getPicture()!=null){
            Glide
                    .with(getBaseContext())
                    .load(gym.getPicture())
                    .centerCrop()
                    .into(imageViewPictureGymDetail);
        }else{
            Glide
                    .with(getBaseContext())

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(imageViewPictureGymDetail);
        }
    }
    public void loadGym(){
        service = ServiceGenerator.createService(GymService.class);
        Call<GymResponse> getOne = service.getOne(id);
        getOne.enqueue(new Callback<GymResponse>() {
            @Override
            public void onResponse(Call<GymResponse> call, Response<GymResponse> response) {
                if (response.isSuccessful()){
                    Log.d("GetOne Gym with success", "Éxito");
                    gym=response.body();

                    //MAP
                    if (mMap!=null){
                        LatLng position = obtainLatLong();
                        mMap.addMarker(new MarkerOptions().position(position).title("Marker in " + gym.getAddress())).setTag(gym.getId());

                        mMap.moveCamera(CameraUpdateFactory.newLatLng(position));


                    }
                    setItems();
                    //MAP
                }else{
                    Toast.makeText(getBaseContext(), "Gym error", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onFailure(Call<GymResponse> call, Throwable t) {
                Log.e("Load error", t.getMessage());

            }
        });

    }

    public LatLng obtainLatLong(){
        String loc =gym.getPosition();
        String[] locs =loc.split(",");
        locs[0].trim();
        locs[1].trim();
        float latitud = Float.parseFloat(locs[0]);
        float longitud = Float.parseFloat(locs[1]);

        LatLng position = new LatLng(latitud, longitud);
        return position;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        gmap = googleMap;
        gmap.setMinZoomPreference(10);
        mMap=googleMap;
        if (gym!=null){

            LatLng position =obtainLatLong();
            googleMap.addMarker(new MarkerOptions().position(position).title("Marker in " + gym.getAddress())).setTag(gym.getId());

            gmap.moveCamera(CameraUpdateFactory.newLatLng(position));
        }
    }
    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);

        Bundle mapViewBundle = outState.getBundle(MAP_VIEW_BUNDLE_KEY);
        if (mapViewBundle == null) {
            mapViewBundle = new Bundle();
            outState.putBundle(MAP_VIEW_BUNDLE_KEY, mapViewBundle);
        }

        mapViewDetail.onSaveInstanceState(mapViewBundle);
    }
    @Override
    protected void onResume() {
        super.onResume();
        mapViewDetail.onResume();
    }

    @Override
    protected void onStart() {
        super.onStart();
        mapViewDetail.onStart();
    }

    @Override
    protected void onStop() {
        super.onStop();
        mapViewDetail.onStop();
    }
    @Override
    protected void onPause() {
        mapViewDetail.onPause();
        super.onPause();
    }
    @Override
    protected void onDestroy() {
        mapViewDetail.onDestroy();
        super.onDestroy();
    }
    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapViewDetail.onLowMemory();
    }
}
