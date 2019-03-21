package com.example.fittrain.ui.profile;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.app.AlertDialog;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.dto.PasswordDto;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.AuthType;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.UserService;
import com.example.fittrain.ui.profile.edit.EditProfileActivity;
import com.example.fittrain.util.UtilToken;
import com.example.fittrain.util.Validator;

import okhttp3.Credentials;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.Context.LAYOUT_INFLATER_SERVICE;


public class ProfileFragment extends Fragment implements ProfileInteracctionListener{

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";
    private String jwt;
    private UserService userService;
    private UserResponse myUser;

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;
    private Context ctx;
    private Button btn_edit, btn_change_password;
    private OnFragmentInteractionListener mListener;
    private ImageView imageViewProfile;
    private TextView textViewWeight, textViewHeight, textViewGender, textViewTrainingYears, textViewEmail, textViewName, textViewYearsOld;
    private EditText editTextPasswordDialog, editTextNewPassword;
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
        textViewEmail = v.findViewById(R.id.textViewEmailWrittenEdit);
        textViewName= v.findViewById(R.id.textViewNameEdit);
        textViewYearsOld = v.findViewById(R.id.textViewYearsWrittenEdit);

        //buttons
        btn_change_password=v.findViewById(R.id.btn_change_password);
        btn_edit = v.findViewById(R.id.btn_save_profile);

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
        btn_edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                goToEditProfile();
            }
        });
        btn_change_password.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                changePassword();
            }
        });

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

    @Override
    public void goToEditProfile() {
    Intent iEdit = new Intent(getContext(), EditProfileActivity.class);
    startActivity(iEdit);
    }
    public void changePasswordPetition(){
        /* String credentials = Credentials.basic(email, password);
            LoginService service = ServiceGenerator.createService(LoginService.class);
            Call<AuthResponse> login = service.doLogin(credentials);*/
        String email, password;
        email=UtilToken.getEmail(ctx);
        password=editTextPasswordDialog.getText().toString();
        String credentials = Credentials.basic(email, password);
        userService = ServiceGenerator.createService(UserService.class);
        PasswordDto pDto = new PasswordDto(editTextNewPassword.getText().toString());
        Call<UserResponse> call = userService.editPassword(credentials, myUser.getId(), pDto);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (!response.isSuccessful()) {
                    Log.e("error response", "code error");
                    Toast.makeText(getActivity(), "Error, OLD PASSWORD INCORRECT.", Toast.LENGTH_SHORT).show();
                } else {
                    Log.e("successful response", "Successful response in change password");
                    Toast.makeText(getActivity(), "Your password has been changed.", Toast.LENGTH_SHORT).show();



                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Log.e("failure", "failure in petition");

            }
        });


    }

    /* LayoutInflater inflater = (LayoutInflater) getSystemService(LAYOUT_INFLATER_SERVICE);
        @SuppressLint("ResourceType")
        View dialogLayout = inflater.inflate(R.layout.activity_search, null);
        android.support.v7.app.AlertDialog.Builder builder = new android.support.v7.app.AlertDialog.Builder(this);
        builder.setTitle("Training filter");

        builder.setView(dialogLayout);*/
    @Override
    public void changePassword() {

        LayoutInflater inflater = (LayoutInflater) ctx.getSystemService(LAYOUT_INFLATER_SERVICE);
        @SuppressLint("ResourceType")
        View dialogLayout = inflater.inflate(R.layout.change_pass_dialog, null);

        editTextPasswordDialog = dialogLayout.findViewById(R.id.editTextFirstPassword);
        editTextNewPassword = dialogLayout.findViewById(R.id.editTextNewPassword);
        AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
        final AlertDialog d =builder.setTitle("Change password.")
                .setView(dialogLayout)
                .setPositiveButton(R.string.changePassword, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {

                    }
                })
                .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        //Do nothing here because we override this button later to change the close behaviour.
                        //However, we still need this because on older versions of Android unless we
                        //pass a handler the button doesn't get instantiated
                    }
                })
                .create();
        d.show();
        d.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (validate()){
                    changePasswordPetition();
                    d.dismiss();
                }
            }
        });
        d.getButton(AlertDialog.BUTTON_NEGATIVE).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                d.dismiss();
            }
        });

            /*d.getButton(AlertDialog.BUTTON_POSITIVE).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (1==0){

                    }
                }
            });*/


            /*.setPositiveButton(R.string.changePassword, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            String passOne, passRepeat;
                            passOne = editTextPasswordDialog.getText().toString();
                            passRepeat = editTextNewPassword.getText().toString();
                            if (validate()){
                                changePasswordPetition();

                            }else{

                            }



                        }
                    })
                    .setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            // User cancelled the dialog
                        }
                    });*/

    }

    public boolean validate(){
        int min=8, max=15;
        boolean isValid=true;
        Validator.clearError(editTextPasswordDialog);
        Validator.clearError(editTextNewPassword);
        String empty = getString(R.string.empty), size=getString(R.string.size_password), samePassword=getString(R.string.isNotSame);
        if (!Validator.isNotEmpty(editTextPasswordDialog)){
            isValid=false;
            Validator.setError(editTextPasswordDialog, empty);
        }
        if (Validator.isLessThan(editTextPasswordDialog, min) || Validator.isGreaterThan(editTextPasswordDialog, max)){
            isValid=false;
            Validator.setError(editTextPasswordDialog, size);
        }


        if (!Validator.isNotEmpty(editTextNewPassword)){
            isValid=false;
            Validator.setError(editTextNewPassword, "Empty");

        }
        if (Validator.isLessThan(editTextNewPassword, min) || Validator.isGreaterThan(editTextNewPassword, max)){
            isValid=false;
            Validator.setError(editTextNewPassword, size);
        }

        return isValid;
    }


    public interface OnFragmentInteractionListener {
        // TODO: Update argument type and name
        void onFragmentInteraction(Uri uri);
    }
}
