package com.example.fittrain.ui.common;

import android.arch.lifecycle.ViewModelProviders;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toolbar;

import com.example.fittrain.R;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.ui.gym.GymFragment;
import com.example.fittrain.ui.profile.ProfileFragment;
import com.example.fittrain.ui.training.TrainingFragment;
import com.example.fittrain.util.ViewModelUser;

public class DashboardActivity extends AppCompatActivity {
    private ViewModelUser mViewModel;
    private Fragment fragmentGym, fragmentTraining, fragmentProfile;
    UserResponse uPass;
    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {

                case R.id.navigation_training:
                    getSupportActionBar().setTitle(R.string.title_training);
                    goToFragment(fragmentTraining);
                    return true;
                case R.id.navigation_gym:
                    getSupportActionBar().setTitle(R.string.title_gym);
                    goToFragment(fragmentGym);
                    return true;
                case R.id.navigation_profile:
                    getSupportActionBar().setTitle(R.string.title_profile);
                    goToFragment(fragmentProfile);

                    return true;
            }
            return false;
           /* if (f != null) {
                goToFragment(f);
                return true;
            }else{
                goToFragment(new TrainingFragment());
                return false;

            }*/

        }
        //en oncreate fragment
        /*mViewModel = ViewModelProviders.of(getActivity()).get(ColorViewModel.class);
        mViewModel.getSelectedColor().observe(getActivity(),
                color -> layout.setBackgroundColor(Color.parseColor(color)));*/
    };
    public void goToFragment(Fragment f){
        getSupportFragmentManager()
                .beginTransaction()
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


}
