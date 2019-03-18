package com.example.fittrain.retrofit.services;

import com.example.fittrain.model.ResponseContainer;
import com.example.fittrain.model.TrainingResponse;

import retrofit2.Call;
import retrofit2.http.GET;

public interface GymService {
    final String BASE_URL = "/gym";
    /*@GET(BASE_URL)
    Call<ResponseContainer<GymResponse>> listAll();*/

}
