package com.example.fittrain.ui.exercise;

import android.os.Handler;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.example.fittrain.R;
import com.example.fittrain.model.ExerciseResponse;

import java.util.ArrayList;
import java.util.List;

public class ListExercisesActivity extends AppCompatActivity {
    FrameLayout frameLayoutListExercises;
    ExerciseFragment eFrament;
    private Button btnStart, btnStop, btnObtainPoints;
    private TextView textViewTrainingTotalTime, textViewTimeWritten;

    boolean isOn=false;
    int mili=0, seg=0, minutos=0;
    Handler h =new Handler();
    private String totalTimeTraining;
    Thread cronos;
    private List<ExerciseResponse> list = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_exercises);
        frameLayoutListExercises = findViewById(R.id.frameListExercises);

        list=(List<ExerciseResponse>)getIntent().getExtras().getSerializable("exercisesList");

        eFrament = new ExerciseFragment(list);
        goToFragment(eFrament);
        loadItems();
    }
    public void loadItems(){
        btnObtainPoints = findViewById(R.id.buttonObtainPoints);
        btnStart = findViewById(R.id.buttonStart);
        btnStop = findViewById(R.id.buttonStop);
        textViewTimeWritten=findViewById(R.id.textViewTimeWritten);
        textViewTrainingTotalTime = findViewById(R.id.textViewTrainingTimeTotal);

    }
    //pasar el entrenamiento por put
    //cojo el tiempo total del entreno
    //onclick evento al empezar se empieza al stop se detiene
    //si el tiempo a llegado al total del entrenamiento el boton obtener puntos pasa de desabilitado a habilitado
    //al pulsar obtener puntos se hace una peticion a la api editando el usuario de forma que se le sumen los puntos obtenidos
    //el algoritmo sera puntos * nivel de entrenamiento
    //limpiar el detail de entrenamiento de codigo y diseño cronometro
    public void setItems(){

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
                        if (1==1){
                            isOn=false;
                            btnObtainPoints.setEnabled(true);
                        }
                    }
                }
            }
        });
        cronos.start();
    }

}
