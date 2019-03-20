package com.example.fittrain.ui.training;

import android.content.Intent;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.model.TrainingOneResponse;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.TrainingService;
import com.example.fittrain.ui.exercise.ListExercisesActivity;

import java.io.Serializable;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class TrainingDetailsActivity extends AppCompatActivity {
    private TextView textViewName, textViewMinutes, textViewTarget, textViewTotalExercises, textViewDescription;
    private ImageView imageViewPicture;
    private TrainingOneResponse trainingSearched;
    private TrainingService trainingService;
    private Button btn_go_exercises;

    Intent intent;
    private String idTraining;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_training_details);
        loadItems();
        loadTraining();
    }

    public void loadItems() {
        imageViewPicture=findViewById(R.id.imageViewPictureGym);
        textViewName=findViewById(R.id.textViewTitleNamePriceGym);
        textViewMinutes=findViewById(R.id.textViewMinutes);
        textViewTarget=findViewById(R.id.textViewNamePriceGymDetail);
        textViewTotalExercises=findViewById(R.id.textViewTotalExercises);

        intent = getIntent();
        if (intent.hasExtra("id"))
            idTraining = intent.getStringExtra("id");
        textViewDescription = findViewById(R.id.textViewDescriptionDetailGym);
        btn_go_exercises = findViewById(R.id.buttonWatchExercises);


    }
    public void goToFragment(Fragment f){
        /*getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragmentExercises, f)
                .commit();*/
    }
    public void loadTraining(){

            trainingService= ServiceGenerator.createService(TrainingService.class);

            Call<TrainingOneResponse> call = trainingService.getOne(idTraining);
            call.enqueue(new Callback<TrainingOneResponse>() {
                @Override
                public void onResponse(Call<TrainingOneResponse> call, Response<TrainingOneResponse> response) {
                    if (!response.isSuccessful()) {
                        Log.e("error response", "code error");
                        Toast.makeText(getBaseContext(), "Error in request", Toast.LENGTH_SHORT).show();


                    } else {
                        Log.e("successful response", "code error");

                        trainingSearched = response.body();
                        setItems();




                    }
                }

                @Override
                public void onFailure(Call<TrainingOneResponse> call, Throwable t) {
                    Log.e("failure", "failure in petition");

                }
            });


    }
    public void setItems(){

        if (trainingSearched.getPicture()!=null){
            Glide
                    .with(this)
                    .load(trainingSearched.getPicture())
                    .centerCrop()
                    .into(imageViewPicture);
        }else{
            Glide
                    .with(this)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(imageViewPicture);
        }

        textViewTotalExercises.setText(String.valueOf(trainingSearched.getExercises().size())+" exercises");
        textViewTarget.setText(trainingSearched.getTarget());
        textViewMinutes.setText(trainingSearched.getTime()+" minutes");
        textViewName.setText(trainingSearched.getName());
        textViewDescription.setText(trainingSearched.getDescription());
        btn_go_exercises.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //IR A ACTIVITY CON LISTA DE ENTRENAMIENTOS
                Intent iListExercises = new Intent(getApplicationContext(), ListExercisesActivity.class);
                iListExercises.putExtra("exercisesList", (Serializable) trainingSearched.getExercises());
                startActivity(iListExercises);
                /*Pasarme del list training al listexercisesactivity los ejercicios
                * crear fragmento con la lista
                * pasarle la lista de ejercicios al listexercise activity*/
            }
        });

    }

}
