package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.List;
import java.util.Objects;

public class TrainingOneResponse {

    private String id;
    private String name;
    private String target;
    private String time;
    private String description;
    private String picture;
    private List<ExerciseResponse> exercises;

    public TrainingOneResponse() {
    }

    public TrainingOneResponse(String id, String name, String target, String time, String description, String picture, List<ExerciseResponse> exercises) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.time = time;
        this.description = description;
        this.picture = picture;
        this.exercises = exercises;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public List<ExerciseResponse> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseResponse> exercises) {
        this.exercises = exercises;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrainingOneResponse that = (TrainingOneResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(target, that.target) &&
                Objects.equals(time, that.time) &&
                Objects.equals(description, that.description) &&
                Objects.equals(picture, that.picture);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(id, name, target, time, description, picture);
    }

    @Override
    public String toString() {
        return "TrainingOneResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", target='" + target + '\'' +
                ", time='" + time + '\'' +
                ", description='" + description + '\'' +
                ", picture='" + picture + '\'' +
                '}';
    }
}
