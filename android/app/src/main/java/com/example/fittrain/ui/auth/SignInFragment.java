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
public class SignInFragment extends Fragment {
    private FragmentTransaction fragmentChanger;
    private Fragment signUpFragment;
    private Button btnSignIn, btnGoSignUp;
    private Context ctx;
    public SignInFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v= inflater.inflate(R.layout.fragment_sign_in, container, false);
        loadItems(v);
        return v;
    }
    public void loadItems(View v){
        ctx=getContext();
        signUpFragment = new SignUpFragment();
        btnGoSignUp = v.findViewById(R.id.buttonGoRegister);
        btnSignIn = v.findViewById(R.id.buttonLogin);

        btnGoSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                fragmentChanger = getFragmentManager().beginTransaction().replace(R.id.containerLogin, signUpFragment);
                fragmentChanger.commit();
            }
        });
        btnSignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doLogin();
            }
        });

    }
    public void doLogin(){

    }

}
