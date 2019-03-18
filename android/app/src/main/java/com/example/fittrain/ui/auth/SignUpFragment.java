package com.example.fittrain.ui.auth;


import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.fittrain.R;
import com.example.fittrain.model.AuthResponse;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.LoginService;
import com.example.fittrain.util.UtilToken;
import com.example.fittrain.util.Validator;

import retrofit2.Call;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class SignUpFragment extends Fragment {
    private FragmentTransaction fragmentChanger;
    private Fragment signInFragment;
    private Button btnSignUp, btnGoSignIn;
    private EditText editTextEmail, editTextPassword, editTextpasswordTwoRegister;

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
        editTextEmail=v.findViewById(R.id.editTextEmailRegister);
        editTextPassword=v.findViewById(R.id.editTextPasswordOneRegister);
        editTextpasswordTwoRegister=v.findViewById(R.id.editTextPasswordTwoRegister);
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
    private void doSignUp() {
        String email = editTextEmail.getText().toString();
        String password= editTextPassword.getText().toString();
        String passwordTwo = editTextpasswordTwoRegister.getText().toString();
        if (validate()){
            UserResponse register = new UserResponse(email, password);
            LoginService service = ServiceGenerator.createService(LoginService.class);
            Call<AuthResponse> loginReponseCall = service.doRegister(register);

            loginReponseCall.enqueue(new retrofit2.Callback<AuthResponse>() {
                @Override
                public void onResponse(Call<AuthResponse> call, Response<AuthResponse> response) {
                    if (response.code() == 201) {
                        // success
                        UtilToken.setToken(ctx, response.body().getToken());
                        UtilToken.setId(ctx, response.body().getUser().getId());
                        UtilToken.setToken(ctx, response.body().getToken());
                        //startActivity(new Intent(ctx, DashboardActivity.class));
                    } else {
                        // error
                        Toast.makeText(ctx, "Error while signing up.", Toast.LENGTH_LONG).show();
                    }
                }

                @Override
                public void onFailure(Call<AuthResponse> call, Throwable t) {
                    Log.e("NetworkFailure", t.getMessage());
                    Toast.makeText(ctx, "Network Connection Failure", Toast.LENGTH_SHORT).show();

                }
            });
        }

    }

    public boolean validate(){
        int passMinSize=6, passMaxSize=15;
        Validator.clearError(editTextEmail);
        Validator.clearError(editTextPassword);
        Validator.clearError(editTextpasswordTwoRegister);
        String incorrectEmail, incorrectPassword, samePassword;
        incorrectEmail = getString(R.string.incorrect_email);
        incorrectPassword = getString(R.string.size_password);
        samePassword=getString(R.string.repeatPassword);
        boolean isValid=true;
        if (!Validator.isNotEmpty(editTextEmail) || !Validator.checkEmail(editTextEmail)){
            isValid=false;
            Validator.setError(editTextEmail, incorrectEmail);
        }

        if (Validator.isLessThan(editTextpasswordTwoRegister, passMinSize) || Validator.isGreaterThan(editTextpasswordTwoRegister, passMaxSize)){
            isValid=false;

            Validator.setError(editTextpasswordTwoRegister, incorrectPassword);
        }
        if (!Validator.isSamePassword(editTextpasswordTwoRegister, editTextpasswordTwoRegister)){
            isValid=false;
            Validator.setError(editTextpasswordTwoRegister, samePassword);
        }

        return isValid;

    }


}
