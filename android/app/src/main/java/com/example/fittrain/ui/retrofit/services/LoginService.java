package com.example.fittrain.ui.retrofit.services;



import com.example.fittrain.ui.model.AuthResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginService {

    @POST("/auth")
    Call<AuthResponse> doLogin(@Header("Authorization") String authorization);

   /* @POST("/users")
    Call<LoginRegisterResponse> doRegister(@Body UserResponse signedUpUser);*/



}

