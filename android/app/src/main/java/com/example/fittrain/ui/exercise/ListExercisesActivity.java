package com.example.fittrain.ui.exercise;

import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.FrameLayout;

import com.example.fittrain.R;
import com.example.fittrain.model.ExerciseResponse;

import java.util.ArrayList;
import java.util.List;

public class ListExercisesActivity extends AppCompatActivity {
    FrameLayout frameLayoutListExercises;
    ExerciseFragment eFrament;
    private List<ExerciseResponse> list = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_exercises);
        frameLayoutListExercises = findViewById(R.id.frameListExercises);

        list=(List<ExerciseResponse>)getIntent().getExtras().getSerializable("exercisesList");

        eFrament = new ExerciseFragment(list);
        goToFragment(eFrament);
    }
    public void goToFragment(Fragment f){
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frameListExercises, f)
                .commit();
    }
}
