package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.List;
import java.util.Objects;

public class TrainingResponse {
/* "id": "5c8e06df62274718e10cdac5",
    "name": "uno",
    "target": "Lost weight",
    "time": "1",
    "picture": "https://s.imgur.com/images/logo-1200-630.jpg?2",
    "description": "pepe",
    "exercises": [],
    "level": 1*/
    private String id;
    private String name;
    private String target;
    private String time;
    private String picture;
    private String description;
    private List<String> exercises;
    private int level;

    public TrainingResponse() {
    }

    public TrainingResponse(String id, String name, String target, String time, String picture, String description, List<String> exercises, int level) {
        this.id = id;
        this.name = name;
        this.target = target;
        this.time = time;
        this.picture = picture;
        this.description = description;
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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getExercises() {
        return exercises;
    }

    public void setExercises(List<String> exercises) {
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
        TrainingResponse that = (TrainingResponse) o;
        return level == that.level &&
                Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(target, that.target) &&
                Objects.equals(time, that.time) &&
                Objects.equals(picture, that.picture) &&
                Objects.equals(description, that.description) &&
                Objects.equals(exercises, that.exercises);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(id, name, target, time, picture, description, exercises, level);
    }

    @Override
    public String toString() {
        return "TrainingResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", target='" + target + '\'' +
                ", time='" + time + '\'' +
                ", picture='" + picture + '\'' +
                ", description='" + description + '\'' +
                ", exercises=" + exercises +
                ", level=" + level +
                '}';
    }
}
