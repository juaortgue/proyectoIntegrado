package com.example.fittrain.ui.training;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.arch.lifecycle.ViewModelProviders;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.fittrain.R;
import com.example.fittrain.model.ResponseContainer;
import com.example.fittrain.model.TrainingResponse;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.TrainingService;
import com.example.fittrain.ui.auth.LoginActivity;
import com.example.fittrain.ui.common.DashboardActivity;
import com.example.fittrain.ui.profile.ProfileFragment;
import com.example.fittrain.ui.training.dummy.DummyContent.DummyItem;
import com.example.fittrain.util.UtilToken;
import com.example.fittrain.util.ViewModelUser;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class TrainingFragment extends Fragment {
    private FragmentTransaction fragmentChanger;
    private Spinner spinnerTarget;
    private ViewModelUser mViewModel;
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    Context ctx;
    String token;
    private UserResponse userReceived;

    MyTrainingRecyclerViewAdapter adapter;
    List<TrainingResponse> trainingList = new ArrayList<>();
    private TrainingService trainingService;
    Map<String, String> options = new HashMap<>();

    @SuppressLint("ValidFragment")
    public TrainingFragment() {
    }


    @SuppressWarnings("unused")
    public static TrainingFragment newInstance(int columnCount) {
        TrainingFragment fragment = new TrainingFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
            userReceived = (UserResponse) getArguments().getSerializable("user");
            userReceived.getTrainingYears();

        }


    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_training_list, container, false);
        setHasOptionsMenu(true);
        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = getContext();
            spinnerTarget=getActivity().findViewById(R.id.spinnerTarget);

            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }

            int level =0;
            level = putLevelAlgorimt();
            if (level!=0){
                //consulta que te devuelva solo los training de cierto nivel
                loadTraining(recyclerView, level);
            }else{
                loadTraining(recyclerView);
                createAndShowUserDates();


            }


        }
        return view;
    }
    public double calculateImc(){
        int comparative=0, divisor=100;
        double heighReceived=0.0;

         double imc=0;
         if (userReceived.getHeight()!=comparative && userReceived.getWeight()!=comparative ){
             heighReceived = userReceived.getHeight();
             heighReceived = heighReceived/divisor;
             heighReceived = heighReceived*heighReceived;
             imc = userReceived.getWeight() / heighReceived;
         }


         return imc;
    }
    public int putLevelAlgorimt(){
        int level=0;

        double imc = calculateImc();
        double insuficiency=18.4, normalMin=18.5, normalMax=24.9, overweightMin = 25,
                overweightMax=29.9, obesityIMin=30, obesityIMax=34.9, obesityIIMin=35,
                obesityIIMax = 39.9, obesityIIIMax=40;

            //aument level with training years
        if (userReceived.getTrainingYears()>=1 && userReceived.getTrainingYears()<=2){
            level=level+1;
        }else if (userReceived.getTrainingYears()==3){
            level=level+2;
        }else if (userReceived.getTrainingYears()>3)
            level=level+3;


        //desnutricion
        if (imc<=insuficiency && imc>0){

            level=1;
        }
        //obesidad 2
        else if ((imc>=obesityIIMin && imc <=obesityIIMax)){
            level=1;

        }
        //obesidad 3
        else if (imc>=obesityIIMax && imc<=obesityIIIMax){
            level=1;

        }
        //obesidad 1
        else if (imc>=obesityIMin && imc<=obesityIMax){
            level=2;
        }
        //normo peso
        else if (imc>=normalMin && imc<= normalMax){
            level=2;
        }
        //sobrepeso
        else if (imc<=overweightMin && imc>=overweightMax){
            level=2;
        }
        else{
            level=0;

        }



        return level;
    }






    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        /*if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }*/
    }

    @Override
    public void onDetach() {
        super.onDetach();
        //mListener = null;
    }

    public interface OnListFragmentInteractionListener {
        void onListFragmentInteraction(DummyItem item);
    }


    public void loadTraining(RecyclerView recyclerView){
        trainingService= ServiceGenerator.createService(TrainingService.class);
        Call<ResponseContainer<TrainingResponse>> call = trainingService.listAll();
        call.enqueue(new Callback<ResponseContainer<TrainingResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<TrainingResponse>> call, Response<ResponseContainer<TrainingResponse>> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("successful response", "code error");

                    trainingList = response.body().getRows();

                    adapter = new MyTrainingRecyclerViewAdapter(
                            ctx,
                            trainingList);
                    recyclerView.setAdapter(adapter);


                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<TrainingResponse>> call, Throwable t) {
                Log.e("failure", "failure in petition");
            }
        });
    }
    public void loadTraining(RecyclerView recyclerView, int level){
        trainingService= ServiceGenerator.createService(TrainingService.class);
        Call<ResponseContainer<TrainingResponse>> call = trainingService.listAllFilterByLevel(level);
        call.enqueue(new Callback<ResponseContainer<TrainingResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<TrainingResponse>> call, Response<ResponseContainer<TrainingResponse>> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("successful response", "code error");

                    trainingList = response.body().getRows();

                    adapter = new MyTrainingRecyclerViewAdapter(
                            ctx,
                            trainingList);
                    recyclerView.setAdapter(adapter);


                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<TrainingResponse>> call, Throwable t) {
                Log.e("failure", "failure in petition");
            }
        });
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);


    }
    public void createAndShowLogoutDialog(){
        AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
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
    public void createAndShowUserDates(){
        AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
        builder.setTitle(R.string.userDates)
                .setMessage(R.string.userDatesMessage)
                .setPositiveButton(R.string.accept, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        getFragmentManager()
                                .beginTransaction()
                                .replace(R.id.contenedor, new ProfileFragment())
                                .commit();
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
        UtilToken.clearAll(ctx);
        Intent iLogin = new Intent(ctx, LoginActivity.class);
        startActivity(iLogin);
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
        inflater.inflate(R.menu.menu_items, menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        //return super.onOptionsItemSelected(item);
        switch (item.getItemId()) {

            case R.id.action_filter:
                searchOptions();
                return false;
            case R.id.action_logout:
                createAndShowLogoutDialog();

                return true;

            default:
                break;
        }
        return false;
    }
    public void searchOptions () {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // Get the layout inflater
        LayoutInflater inflater = getActivity().getLayoutInflater();


        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
        builder.setView(inflater.inflate(R.layout.activity_search, null))
                .setTitle(R.string.filterTrainingDialog)
                // Add action buttons
                .setPositiveButton(R.string.filter, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {

                    }
                })
                .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                       dialog.cancel();
                    }
                });
        Dialog d =builder.create();
        d.show();



    }
}
