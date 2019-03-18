package com.example.fittrain.retrofit.services;



import com.example.fittrain.model.AuthResponse;
import com.example.fittrain.model.UserResponse;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface LoginService {

    @POST("/auth")
    Call<AuthResponse> doLogin(@Header("Authorization") String authorization);

   @POST("/users")
    Call<AuthResponse> doRegister(@Body UserResponse signedUpUser);



}

