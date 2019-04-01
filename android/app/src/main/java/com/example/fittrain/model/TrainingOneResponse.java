package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

public class TrainingOneResponse implements Serializable {

    private String id;
    private String name;
    private String target;
    private String time;
    private String description;
    private String picture;
    private List<ExerciseResponse> exercises;
    private int level;

    public TrainingOneResponse() {
    }

    public TrainingOneResponse(String id, String name, String target, String time, String description, String picture, List<ExerciseResponse> exercises, int level) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.time = time;
        this.description = description;
        this.picture = picture;
        this.exercises = exercises;
        this.level = level;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TrainingOneResponse that = (TrainingOneResponse) o;
        return getLevel() == that.getLevel() &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getTarget(), that.getTarget()) &&
                Objects.equals(getTime(), that.getTime()) &&
                Objects.equals(getDescription(), that.getDescription()) &&
                Objects.equals(getPicture(), that.getPicture());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getTarget(), getTime(), getDescription(), getPicture(), getLevel());
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
                ", exercises=" + exercises +
                ", level=" + level +
                '}';
    }
}
