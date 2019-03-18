package com.example.fittrain.ui.common;

import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.TextView;
import android.widget.Toolbar;

import com.example.fittrain.R;
import com.example.fittrain.ui.gym.GymFragment;
import com.example.fittrain.ui.profile.ProfileFragment;
import com.example.fittrain.ui.training.TrainingFragment;

public class DashboardActivity extends AppCompatActivity {


    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {
        Fragment f = null;
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {

                case R.id.navigation_training:
                    f = new TrainingFragment();
                    getSupportActionBar().setTitle(R.string.title_training);
                    return true;
                case R.id.navigation_gym:
                    f = new GymFragment();
                    getSupportActionBar().setTitle(R.string.title_gym);
                    return true;
                case R.id.navigation_profile:
                    f = new ProfileFragment();
                    getSupportActionBar().setTitle(R.string.title_profile);

                    return true;
            }
            if (f != null) {
                getSupportActionBar().setTitle(R.string.title_training);
                getSupportFragmentManager()
                        .beginTransaction()
                        .replace(R.id.contenedor, f)
                        .commit();
                return true;
            }
            return false;
        }
        //en oncreate fragment
        /*mViewModel = ViewModelProviders.of(getActivity()).get(ColorViewModel.class);
        mViewModel.getSelectedColor().observe(getActivity(),
                color -> layout.setBackgroundColor(Color.parseColor(color)));*/
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);



    }

}
