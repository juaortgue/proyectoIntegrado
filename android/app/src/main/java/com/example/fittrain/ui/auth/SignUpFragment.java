package com.example.fittrain.ui.auth;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.fittrain.R;

/**
 * A simple {@link Fragment} subclass.
 */
public class SignUpFragment extends Fragment {
    private FragmentTransaction fragmentChanger;
    private Fragment signInFragment;
    private Button btnSignUp, btnGoSignIn;
    private Context ctx;

    public SignUpFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v= inflater.inflate(R.layout.fragment_sign_up, container, false);
        loadItems(v);
        return v;
    }
    public void loadItems(View v){
        ctx=getContext();
        signInFragment = new SignInFragment();
        btnSignUp = v.findViewById(R.id.buttonRegisterOnRegisterFragment);
        btnGoSignIn = v.findViewById(R.id.button_cancel);
        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doSignUp();
            }
        });
        btnGoSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fragmentChanger = getFragmentManager().beginTransaction().replace(R.id.containerLogin, signInFragment);
                fragmentChanger.commit();
            }
        });
    }
    public void doSignUp(){

    }


}
