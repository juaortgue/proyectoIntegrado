package com.example.fittrain.retrofit.services;

import com.example.fittrain.model.ExerciseResponse;
import com.example.fittrain.model.ResponseContainer;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ExerciseService {
    final String BASE_URL = "/exercise";
    @GET(BASE_URL)
    Call<ResponseContainer<ExerciseResponse>> listAll();

    @GET(BASE_URL + "/{id}")
    Call<ExerciseResponse> getOne(@Path("id") String id);

}
