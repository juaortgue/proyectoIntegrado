package com.example.fittrain.ui.common;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.Spinner;

import com.example.fittrain.R;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.ui.auth.LoginActivity;
import com.example.fittrain.ui.gym.GymFragment;
import com.example.fittrain.ui.map.MapsActivity;
import com.example.fittrain.ui.profile.ProfileFragment;
import com.example.fittrain.ui.profile.edit.EditProfileActivity;
import com.example.fittrain.ui.training.TrainingFragment;
import com.example.fittrain.util.UtilToken;
import com.example.fittrain.util.ViewModelUser;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import okhttp3.internal.Util;

public class DashboardActivity extends AppCompatActivity {
    private ViewModelUser mViewModel;
    private int fragmentSelected=0;
    private Fragment fragmentGym, fragmentTraining, fragmentProfile;
    UserResponse uPass;

    Map<String, String> options = new HashMap<>();
    private EditText editTextTitleTraining, editTextTitleGym, editTextAddress;
    private Spinner spinnerTarget;

    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {

                case R.id.navigation_training:
                    fragmentSelected=0;
                    getSupportActionBar().setTitle(R.string.title_training);
                    //if user doesnt have enough date to calculate imc, we redirect him to my profile for a better experience
                    if (!checkEnoughDates())
                        createAndShowUserDates();
                    goToFragment(fragmentTraining);

                    return true;
                case R.id.navigation_gym:
                    getSupportActionBar().setTitle(R.string.title_gym);
                    goToFragment(fragmentGym);
                    fragmentSelected=1;
                    return true;
                case R.id.navigation_profile:
                    getSupportActionBar().setTitle(R.string.title_profile);
                    goToFragment(fragmentProfile);
                    fragmentSelected=2;

                    return true;
            }
            return false;


        }
        //en oncreate fragment
        /*mViewModel = ViewModelProviders.of(getActivity()).get(ColorViewModel.class);
        mViewModel.getSelectedColor().observe(getActivity(),
                color -> layout.setBackgroundColor(Color.parseColor(color)));*/
    };
    public void goToFragment(Fragment f){
        FragmentTransaction ft =getSupportFragmentManager()
                .beginTransaction();
        ft.setCustomAnimations(android.R.animator.fade_in, android.R.animator.fade_out)
        .replace(R.id.contenedor, f)
        .commit();

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        getSupportActionBar().setTitle(R.string.title_training);



        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        UserResponse userToPass =   (UserResponse) getIntent().getExtras().getSerializable("user");

        Bundle bundle = new Bundle();
        bundle.putSerializable("user", userToPass);


        fragmentTraining = new TrainingFragment();
        fragmentGym = new GymFragment();
        fragmentProfile = new ProfileFragment();
        fragmentTraining.setArguments(bundle);

        goToFragment(fragmentTraining);



    }

    @Override
    public void invalidateOptionsMenu() {

        super.invalidateOptionsMenu();
    }
    public boolean checkEnoughDates(){
       boolean isEnought=true;
        if (UtilToken.getHeight(getApplicationContext()) ==0 || UtilToken.getWeight(getApplicationContext())==0)
            isEnought=false;
        return isEnought;
    }

    public void createAndShowUserDates(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(R.string.userDates)
                .setMessage(R.string.userDatesMessage)
                .setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        Intent iEdit = new Intent(getApplicationContext(), EditProfileActivity.class);

                    }
                })
                .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        // User cancelled the dialog
                    }
                });

        // Create the AlertDialog object and return it
        builder.create();
        builder.show();
    }
    public  void logout(){
        UtilToken.clearAll(this);
        Intent iLogin = new Intent(this, LoginActivity.class);
        startActivity(iLogin);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {

            case R.id.action_filter:
                if (fragmentSelected==0)
                    searchOptions();
                if (fragmentSelected==1)
                    searchGymOptions();
                return false;
            case R.id.action_logout:
                createAndShowLogoutDialog();

                return true;
            case R.id.action_map:
                Intent iMap= new Intent(getApplicationContext(), MapsActivity.class);
                if (fragmentSelected==1){
                    iMap.putExtra("options", (Serializable) options);
                    startActivity(iMap);

                }
                return true;
            default:
                break;
        }
        return false;
    }

    @Override
    public void onBackPressed() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setTitle("Exit app");
        builder.setMessage("Do you want to exit? ");
        builder.setPositiveButton("Exit", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                logout();
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
            }
        });
        builder.show();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        getMenuInflater().inflate(R.menu.menu_items, menu);

        return true;

    }

    public void searchGymOptions () {
        LayoutInflater inflater = (LayoutInflater) getSystemService(LAYOUT_INFLATER_SERVICE);
        @SuppressLint("ResourceType")
        View dialogLayout = inflater.inflate(R.layout.activity_gym_search, null);
        android.support.v7.app.AlertDialog.Builder builder = new android.support.v7.app.AlertDialog.Builder(this);
        builder.setTitle("Gym filter");

        builder.setView(dialogLayout);
        //find items
        editTextTitleGym=dialogLayout.findViewById(R.id.editTextSearchNameGym);
        editTextAddress = dialogLayout.findViewById(R.id.editTextSearchAddressGym);
        //find items



        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
        builder.setPositiveButton(R.string.accept, (dialog, which) -> {
            options = new HashMap<>();
            if (!editTextTitleGym.getText().toString().equals("") || !editTextTitleGym.getText().toString().isEmpty())
                options.put("name", editTextTitleGym.getText().toString());
            if (!editTextAddress.getText().toString().equals("") || !editTextAddress.getText().toString().isEmpty())
                options.put("address", editTextAddress.getText().toString());

                goToFragment(new GymFragment(options));


        });
        builder.setNegativeButton(R.string.cancel, (dialog, id) -> {
            Log.d("Back", "Going back");
        });
        android.support.v7.app.AlertDialog dialog = builder.create();
        dialog.show();



    }
    public void searchOptions () {
        LayoutInflater inflater = (LayoutInflater) getSystemService(LAYOUT_INFLATER_SERVICE);
        @SuppressLint("ResourceType")
        View dialogLayout = inflater.inflate(R.layout.activity_search, null);
        android.support.v7.app.AlertDialog.Builder builder = new android.support.v7.app.AlertDialog.Builder(this);
        builder.setTitle("Training filter");

        builder.setView(dialogLayout);
        //find items
        editTextTitleTraining=dialogLayout.findViewById(R.id.editTextSearchTitle);
        spinnerTarget = dialogLayout.findViewById(R.id.spinnerTarget);
        //find items



        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
        builder.setPositiveButton(R.string.accept, (dialog, which) -> {
            options = new HashMap<>();
            if (!editTextTitleTraining.getText().toString().equals("") || !editTextTitleTraining.getText().toString().isEmpty())
                options.put("name", editTextTitleTraining.getText().toString());
            if (!spinnerTarget.getSelectedItem().toString().equals("") || !spinnerTarget.getSelectedItem().toString().isEmpty())
                options.put("target", spinnerTarget.getSelectedItem().toString());
            goToFragment(new TrainingFragment(options));


        });
        builder.setNegativeButton(R.string.cancel, (dialog, id) -> {
            Log.d("Back", "Going back");
        });
        android.support.v7.app.AlertDialog dialog = builder.create();
        dialog.show();



    }
    public void createAndShowLogoutDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(R.string.logoutDialog)
                .setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        logout();
                    }
                })
                .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        // User cancelled the dialog
                    }
                });

        // Create the AlertDialog object and return it
        builder.create();
        builder.show();
    }

}
