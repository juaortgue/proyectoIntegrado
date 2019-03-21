package com.example.fittrain.ui.profile;

import android.content.Context;
import android.net.Uri;
import android.opengl.Visibility;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.AuthType;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.UserService;
import com.example.fittrain.util.UtilToken;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class ProfileFragment extends Fragment {

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private String jwt;
    private UserService userService;
    private UserResponse myUser;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private Context ctx;
    private OnFragmentInteractionListener mListener;
    private ImageView imageViewProfile;
    private TextView textViewWeight, textViewHeight, textViewGender, textViewTrainingYears, textViewEmail, textViewName, textViewYearsOld;

    public ProfileFragment() {
        // Required empty public constructor
    }


    // TODO: Rename and change types and number of parameters
    public static ProfileFragment newInstance(String param1, String param2) {
        ProfileFragment fragment = new ProfileFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }
    public void loadItems(View v){
        ctx = getContext();
        jwt = UtilToken.getToken(ctx);
        imageViewProfile = v.findViewById(R.id.profile_image);
        textViewWeight = v.findViewById(R.id.textViewWeightWritten);
        textViewHeight = v.findViewById(R.id.textViewHeightWritten);
        textViewGender = v.findViewById(R.id.textViewGenderWritten);
        textViewTrainingYears = v.findViewById(R.id.textViewTrainingYearsWritten);
        textViewEmail = v.findViewById(R.id.textViewEmailWritten);
        textViewName= v.findViewById(R.id.textViewName);
        textViewYearsOld = v.findViewById(R.id.textViewYearsWritten);

    }
    public void setItems(){
        if (myUser.getPicture()!=null){
            Glide
                    .with(ctx)
                    .load(myUser.getPicture())
                    .centerCrop()
                    .into(imageViewProfile);
        }else{
            Glide
                    .with(ctx)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(imageViewProfile);
        }

        textViewTrainingYears.setText(String.valueOf(myUser.getTrainingYears())+" years");
        textViewHeight.setText(String.valueOf(myUser.getHeight())+" cm");
        textViewWeight.setText(String.valueOf(myUser.getWeight())+" kg");
        textViewGender.setText(selectAGender());
        textViewEmail.setText(myUser.getEmail());
        textViewName.setText(myUser.getName());
        textViewYearsOld.setText(String.valueOf(myUser.getAge())+" years");

    }
    public String selectAGender(){
        boolean isMale=myUser.isGender();
        String gender="Female";
        if (isMale)
            gender = "Male";
        return gender;

    }
    public void getMe(){
        userService = ServiceGenerator.createService(UserService.class, jwt , AuthType.JWT);
        Call<UserResponse> call = userService.getMe();
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getActivity(), "Error in request", Toast.LENGTH_SHORT).show();
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


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
        setHasOptionsMenu(true);

        //((AppCompatActivity) getActivity()).getSupportActionBar();
    }


    @Override
    public void onPrepareOptionsMenu(Menu menu) {
        super.onPrepareOptionsMenu(menu);
        MenuItem item = menu.findItem(R.id.action_filter);
        item.setVisible(false);
        MenuItem map = menu.findItem(R.id.action_map);
        map.setVisible(false);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        ctx=getContext();
        // Inflate the layout for this fragment
        View v= inflater.inflate(R.layout.fragment_profile, container, false);
        loadItems(v);
        getMe();
        return v;
    }


    // TODO: Rename method, update argument and hook method into UI event
    public void onButtonPressed(Uri uri) {
        if (mListener != null) {
            mListener.onFragmentInteraction(uri);
        }
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }


    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
