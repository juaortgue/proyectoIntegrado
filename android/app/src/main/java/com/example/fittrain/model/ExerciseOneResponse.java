package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.io.Serializable;
import java.util.Objects;

public class ExerciseOneResponse implements Serializable {

    private String name;
    private int series;
    private int repetitions;
    private String finishTime;
    private String restTime;
    private String gif;
    private String deletehash;
    private String categoryId;
    private String description;
    private String createdAt;
    private String updatedAt;
    private String id;
    private String __v;

    public ExerciseOneResponse() {
    }

    public ExerciseOneResponse(String name, int series, int repetitions, String finishTime, String restTime, String gif, String deletehash, String categoryId, String description, String createdAt, String updatedAt, String id, String __v) {
        this.name = name;
        this.series = series;
        this.repetitions = repetitions;
        this.finishTime = finishTime;
        this.restTime = restTime;
        this.gif = gif;
        this.deletehash = deletehash;
        this.categoryId = categoryId;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.id = id;
        this.__v = __v;
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

    public String getDeletehash() {
        return deletehash;
    }

    public void setDeletehash(String deletehash) {
        this.deletehash = deletehash;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String get__v() {
        return __v;
    }

    public void set__v(String __v) {
        this.__v = __v;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ExerciseOneResponse that = (ExerciseOneResponse) o;
        return getSeries() == that.getSeries() &&
                getRepetitions() == that.getRepetitions() &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getFinishTime(), that.getFinishTime()) &&
                Objects.equals(getRestTime(), that.getRestTime()) &&
                Objects.equals(getGif(), that.getGif()) &&
                Objects.equals(getDeletehash(), that.getDeletehash()) &&
                Objects.equals(getCategoryId(), that.getCategoryId()) &&
                Objects.equals(getDescription(), that.getDescription()) &&
                Objects.equals(getCreatedAt(), that.getCreatedAt()) &&
                Objects.equals(getUpdatedAt(), that.getUpdatedAt()) &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(get__v(), that.get__v());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getName(), getSeries(), getRepetitions(), getFinishTime(), getRestTime(), getGif(), getDeletehash(), getCategoryId(), getDescription(), getCreatedAt(), getUpdatedAt(), getId(), get__v());
    }

    @Override
    public String toString() {
        return "ExerciseOneResponse{" +
                "name='" + name + '\'' +
                ", series=" + series +
                ", repetitions=" + repetitions +
                ", finishTime='" + finishTime + '\'' +
                ", restTime='" + restTime + '\'' +
                ", gif='" + gif + '\'' +
                ", deletehash='" + deletehash + '\'' +
                ", categoryId='" + categoryId + '\'' +
                ", description='" + description + '\'' +
                ", createdAt='" + createdAt + '\'' +
                ", updatedAt='" + updatedAt + '\'' +
                ", id='" + id + '\'' +
                ", __v='" + __v + '\'' +
                '}';
    }
}
