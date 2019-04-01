package com.example.fittrain.ui.exercise;

import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.example.fittrain.R;
import com.example.fittrain.dto.UserEditDto;
import com.example.fittrain.model.ExerciseResponse;
import com.example.fittrain.model.TrainingOneResponse;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.AuthType;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.UserService;
import com.example.fittrain.util.UtilToken;

import java.util.ArrayList;
import java.util.List;

import okhttp3.internal.Util;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ListExercisesActivity extends AppCompatActivity {
    FrameLayout frameLayoutListExercises;
    ExerciseFragment eFrament;
    private Button btnStart, btnStop, btnObtainPoints;
    private TextView textViewTrainingTotalTime, textViewTimeWritten;
    private UserService userService;
    private String jwt;
    private int points;
    boolean isOn=false;
    private UserResponse myUser;
    int mili=0, seg=0, minutos=0;
    Handler h =new Handler();
    private TrainingOneResponse training;
    private String totalTimeTraining;
    Thread cronos;
    private List<ExerciseResponse> list = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_exercises);
        frameLayoutListExercises = findViewById(R.id.frameListExercises);

        list=(List<ExerciseResponse>)getIntent().getExtras().getSerializable("exercisesList");
        training = (TrainingOneResponse) getIntent().getExtras().getSerializable("training");
        eFrament = new ExerciseFragment(list);
        goToFragment(eFrament);
        loadItems();
        setItems();
        loadCronos();
        getMe();
    }
    public void loadItems(){
        jwt=UtilToken.getToken(this);
        btnObtainPoints = findViewById(R.id.buttonObtainPoints);
        btnStart = findViewById(R.id.buttonStart);
        btnStop = findViewById(R.id.buttonStop);
        textViewTimeWritten=findViewById(R.id.textViewTimeWritten);
        textViewTrainingTotalTime = findViewById(R.id.textViewTrainingTimeTotal);
        btnObtainPoints.setVisibility(View.INVISIBLE);


    }


    public void setItems(){
        textViewTrainingTotalTime.setText(training.getTime()+" "+getString(R.string.minutes));

        //eventos
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isOn=true;
            }
        });
        btnStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isOn=false;
            }
        });
        btnObtainPoints.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //se calculan los puntos obtenidos y se le añaden al usuario
                calculatePoints();
                updateUserPoints();

            }
        });

    }
    public void dialogPoints(){
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle(R.string.titleDialogPoints);
        builder.setMessage(training.getLevel()*10+" "+this.getString(R.string.points));
        builder.create();
        builder.show();

    }
    private void calculatePoints(){
        int pointsPerLevel=10;
        points = training.getLevel()*pointsPerLevel;
        points = points + myUser.getPoints();

    }
    public UserEditDto reformatMyUserDto(){
        UserEditDto userToEdit= new UserEditDto();
        userToEdit.setAge(Integer.parseInt(String.valueOf(myUser.getAge())));
        userToEdit.setHeight(myUser.getHeight());
        userToEdit.setName(myUser.getName());
        userToEdit.setTrainingYears(myUser.getTrainingYears());
        userToEdit.setWeight(myUser.getWeight());
        userToEdit.setPoints(points);
        //gender
        if (myUser.isGender()){
            userToEdit.setGender(true);
        }else {
            userToEdit.setGender(false);
        }
        //gender
        return userToEdit;

    }
    public void getMe(){

        userService = ServiceGenerator.createService(UserService.class, jwt , AuthType.JWT);
        Call<UserResponse> call = userService.getMe();
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getBaseContext(), "¡Error in petition!", Toast.LENGTH_LONG).show();
                } else {
                    Log.e("successful response", "code error");
                    myUser = response.body();
                    setItems();


                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Log.e("failure", "failure in petition");

            }
        });



    }
    public void updateUserPoints(){
        Call<UserResponse> callEdit = userService.edit(UtilToken.getId(this), reformatMyUserDto());
        callEdit.enqueue(new Callback<UserResponse>() {

            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    UtilToken.setTrainingYears(getBaseContext(), response.body().getTrainingYears());
                    UtilToken.setHeight(getBaseContext(), response.body().getHeight());
                    UtilToken.setWeight(getBaseContext(), response.body().getWeight());
                    dialogPoints();

                    //se colocan los botones por defecto como estaban
                    btnObtainPoints.setEnabled(false);
                    btnObtainPoints.setVisibility(View.INVISIBLE);
                    btnStart.setVisibility(View.VISIBLE);
                    btnStop.setVisibility(View.VISIBLE);
                } else {
                    Toast.makeText(getBaseContext(), "Error updating user", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(getBaseContext(), "Failure", Toast.LENGTH_SHORT).show();
            }
        });
    }
    public void goToFragment(Fragment f){
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.frameListExercises, f)
                .commit();
    }
    public void formatTime(){
        minutos=0;
        mili=0;
        seg=0;
        points=0;
    }
    public void loadCronos(){
        cronos= new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    Thread.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                while (true){
                    if (isOn){
                        try {
                            Thread.sleep(1);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        mili++;
                        if (mili==999){
                            seg++;
                            mili=0;
                        }
                        if (seg==59){
                            minutos++;
                            seg=0;
                        }
                        h.post(new Runnable() {
                            @Override
                            public void run() {
                                String m="", s="", mi="";
                                if (mili<10){
                                    m="00"+mili;
                                }else if (mili<100){
                                    m="0"+mili;
                                }else{
                                    m=""+mili;
                                }
                                if (seg<10){
                                    s="0"+seg;
                                }else{
                                    s=""+seg;
                                }
                                if (minutos<10){
                                    mi="0"+minutos;
                                }else{
                                    mi=""+minutos;
                                }
                                // crono.setText(mi+":"+s+":"+m);
                                textViewTimeWritten.setText(mi+":"+s+":"+m);
                            }
                        });

                        //PARA PRUEBAS
                        if (String.valueOf(seg).equals("10")){
                            isOn=false;

                            formatTime();
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    btnStart.setVisibility(View.INVISIBLE);
                                    btnStop.setVisibility(View.INVISIBLE);
                                    btnObtainPoints.setEnabled(true);
                                    btnObtainPoints.setVisibility(View.VISIBLE);

                                }
                            });
                        }
                        //PARA PRUEBAS

                        if (String.valueOf(minutos).equals(training.getTime())){
                            isOn=false;

                            formatTime();
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    btnStart.setVisibility(View.INVISIBLE);
                                    btnStop.setVisibility(View.INVISIBLE);
                                    btnObtainPoints.setEnabled(true);
                                    btnObtainPoints.setVisibility(View.VISIBLE);

                                }
                            });

                        }
                    }
                }
            }
        });
        cronos.start();
    }

}
