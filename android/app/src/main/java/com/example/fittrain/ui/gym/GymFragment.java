package com.example.fittrain.ui.gym;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.fittrain.R;
import com.example.fittrain.model.GymResponse;
import com.example.fittrain.model.ResponseContainer;
import com.example.fittrain.model.TrainingResponse;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.GymService;
import com.example.fittrain.retrofit.services.TrainingService;

import com.example.fittrain.ui.training.MyTrainingRecyclerViewAdapter;
import com.example.fittrain.util.ViewModelUser;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class GymFragment extends Fragment {

    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    Context ctx;
    String token;

    MyGymRecyclerViewAdapter adapter;
    List<GymResponse> gymsList = new ArrayList<>();
    private GymService gymService;
    Map<String, String> options = new HashMap<>();
    public GymFragment() {

    }

    @SuppressLint("ValidFragment")
    public GymFragment(Map<String,String> options) {
        this.options = options;
    }


    public static GymFragment newInstance(int columnCount) {
        GymFragment fragment = new GymFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_gym_list, container, false);
        // Set the adapter
        if (view instanceof RecyclerView) {
            ctx = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(ctx));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(ctx, mColumnCount));
            }
            loadGyms(recyclerView);
        }
        return view;
    }
    public void loadGyms(RecyclerView recyclerView){
        gymService= ServiceGenerator.createService(GymService.class);

        Call<ResponseContainer<GymResponse>> call = gymService.listAll(options);
        call.enqueue(new Callback<ResponseContainer<GymResponse>>() {
            @Override
            public void onResponse(Call<ResponseContainer<GymResponse>> call, Response<ResponseContainer<GymResponse>> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(ctx, "Error in request", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("successful response", "code error");

                    gymsList = response.body().getRows();

                    adapter = new MyGymRecyclerViewAdapter(
                            getContext(),
                            gymsList);
                    recyclerView.setAdapter(adapter);


                }
            }

            @Override
            public void onFailure(Call<ResponseContainer<GymResponse>> call, Throwable t) {
                Log.e("failure", "failure in petition");
            }
        });
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
    }


    public interface OnListFragmentInteractionListener {
        // TODO: Update argument type and name
        //void onListFragmentInteraction(DummyItem item);
    }
}
