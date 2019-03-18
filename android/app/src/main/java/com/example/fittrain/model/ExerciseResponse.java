package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.Objects;

public class ExerciseResponse {

    private String id;
    private String name;
    private int series;
    private int repetitions;
    private String finishTime;
    private String restTime;
    private String gif;
    private String description;

    public ExerciseResponse() {
    }

    public ExerciseResponse(String id, String name, int series, int repetitions, String finishTime, String restTime, String gif, String description) {
        this.id = id;
        this.name = name;
        this.series = series;
        this.repetitions = repetitions;
        this.finishTime = finishTime;
        this.restTime = restTime;
        this.gif = gif;
        this.description = description;
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

    public int getSeries() {
        return series;
    }

    public void setSeries(int series) {
        this.series = series;
    }

    public int getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(int repetitions) {
        this.repetitions = repetitions;
    }

    public String getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(String finishTime) {
        this.finishTime = finishTime;
    }

    public String getRestTime() {
        return restTime;
    }

    public void setRestTime(String restTime) {
        this.restTime = restTime;
    }

    public String getGif() {
        return gif;
    }

    public void setGif(String gif) {
        this.gif = gif;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExerciseResponse that = (ExerciseResponse) o;
        return getSeries() == that.getSeries() &&
                getRepetitions() == that.getRepetitions() &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getFinishTime(), that.getFinishTime()) &&
                Objects.equals(getRestTime(), that.getRestTime()) &&
                Objects.equals(getGif(), that.getGif()) &&
                Objects.equals(getDescription(), that.getDescription());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getSeries(), getRepetitions(), getFinishTime(), getRestTime(), getGif(), getDescription());
    }

    @Override
    public String toString() {
        return "ExerciseResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", series=" + series +
                ", repetitions=" + repetitions +
                ", finishTime='" + finishTime + '\'' +
                ", restTime='" + restTime + '\'' +
                ", gif='" + gif + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
