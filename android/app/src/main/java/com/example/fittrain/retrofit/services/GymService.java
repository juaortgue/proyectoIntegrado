package com.example.fittrain.retrofit.services;

import com.example.fittrain.model.GymResponse;
import com.example.fittrain.model.ResponseContainer;
import com.example.fittrain.model.TrainingResponse;

import java.util.Map;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.QueryMap;

public interface GymService {
    final String BASE_URL = "/gyms";

    @GET(BASE_URL)
    Call<ResponseContainer<GymResponse>> listAll(@QueryMap Map<String, String> options);
    @GET(BASE_URL + "/{id}")
    Call<GymResponse> getOne(@Path("id") String id);

}
