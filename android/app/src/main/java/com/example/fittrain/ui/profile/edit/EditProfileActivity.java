package com.example.fittrain.ui.profile.edit;

import android.content.Intent;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.dto.UserEditDto;
import com.example.fittrain.model.UserResponse;
import com.example.fittrain.retrofit.generator.AuthType;
import com.example.fittrain.retrofit.generator.ServiceGenerator;
import com.example.fittrain.retrofit.services.UserService;
import com.example.fittrain.util.UtilToken;

import org.w3c.dom.Text;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class EditProfileActivity extends AppCompatActivity {
    private TextView textViewName, textViewEmail;
    private ImageView imageViewPicture;
    private EditText editTextYearsOld, editTextTrainingYears, editTextWeight, editTextHeight, editTextName;
    private Spinner spinnerGender;
    private UserResponse myUser;
    private UserService userService;
    private String jwt;
    private Button btn_save_profile;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_profile);
        loadItems();
        getMe();
    }
    public void loadItems(){
        jwt= UtilToken.getToken(getApplicationContext());
        textViewName = findViewById(R.id.textViewNameEdit);
        textViewEmail=findViewById(R.id.textViewEmailWrittenEdit);
        imageViewPicture=findViewById(R.id.profile_image);
        editTextHeight = findViewById(R.id.editTextHeight);
        editTextWeight=findViewById(R.id.editTextWeight);
        editTextTrainingYears=findViewById(R.id.editTextTrainingYears);
        editTextYearsOld=findViewById(R.id.editTextYearsOld);
        spinnerGender=findViewById(R.id.spinnerSex);
        editTextName=findViewById(R.id.editTextName);
        btn_save_profile=findViewById(R.id.btn_save_profile);
    }
    public void getMe(){

            userService = ServiceGenerator.createService(UserService.class, jwt , AuthType.JWT);
            Call<UserResponse> call = userService.getMe();
            call.enqueue(new Callback<UserResponse>() {
                @Override
                public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                    if (!response.isSuccessful()) {
                        Log.e("error response", "code error");
                        Toast.makeText(getBaseContext(), "Error in request", Toast.LENGTH_SHORT).show();
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

    public void setItems(){
        String gender= selectAGender(),male="Male",female="Female";
        int position=0;
        if (gender.equals(female)){
            position=1;
        }
        spinnerGender.setSelection(position);
        textViewName.setText(myUser.getName());
        textViewEmail.setText(myUser.getEmail());

        editTextHeight.setText(String.valueOf(myUser.getHeight()));
        editTextWeight.setText(String.valueOf(myUser.getWeight()));
        editTextTrainingYears.setText(String.valueOf(myUser.getTrainingYears()));
        editTextYearsOld.setText(String.valueOf(myUser.getAge()));
        editTextName.setText(myUser.getName());


        //uploading picture...
        if (myUser.getPicture()!=null){
            Glide
                    .with(this)
                    .load(myUser.getPicture())
                    .centerCrop()
                    .into(imageViewPicture);
        }else{
            Glide
                    .with(this)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(imageViewPicture);
        }

        //btn click
        btn_save_profile.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateMyProfile();
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
    public void reformatMyUserDto(){
        String female="Female";
        /*private String email;
    private String role;
    private String password;
    private String name;
    private int age;
    private int weight;
    private int height;
    private boolean gender;
    private int trainingYears;*/
        UserEditDto = new UserEditDto(myUser.getEmail(), myUser.getRole());
        myUser.setAge(Integer.parseInt(editTextYearsOld.getText().toString()));
        myUser.setHeight(Integer.parseInt(editTextHeight.getText().toString()));
        myUser.setName(editTextName.getText().toString());
        myUser.setTrainingYears(Integer.parseInt(editTextTrainingYears.getText().toString()));
        myUser.setWeight(Integer.parseInt(editTextWeight.getText().toString()));

        //gender
        if (selectAGender().equals(female)){
            myUser.setGender(false);
        }else {
            myUser.setGender(true);

        }
        //gender

    }
    public void updateMyProfile(){
        reformatMyUserDto();
        Call<UserResponse> callEdit = userService.edit(myUser.getId(), myUser);
        callEdit.enqueue(new Callback<UserResponse>() {

            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(getBaseContext(), "User edited", Toast.LENGTH_SHORT).show();
                    refresh();
                } else {
                    Toast.makeText(getBaseContext(), "Error updating user", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(getBaseContext(), "Failure", Toast.LENGTH_SHORT).show();
            }
        });
    };

    public void refresh() {
        Intent iRefresh = new Intent(this, EditProfileActivity.class);
        startActivity(iRefresh);
    }
}
