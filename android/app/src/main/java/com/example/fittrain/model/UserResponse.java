package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.io.Serializable;
import java.util.Objects;

public class UserResponse implements Serializable {
    private String id;
    private String email;
    private String password;
    private String name;
    private String role;
    private String picture;
    private int weight;
    private int height;
    private boolean gender;
    private int trainingYears;
    private int age;
    private int points;


    public UserResponse() {
    }
    public UserResponse(String email, String password) {
        this.email = email;
        this.password = password;

    }

    public UserResponse(String id, String email, String password, String name, String role, String picture, int weight, int height, boolean gender, int trainingYears, int age, int points) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.role = role;
        this.picture = picture;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.trainingYears = trainingYears;
        this.age = age;
        this.points = points;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public int getTrainingYears() {
        return trainingYears;
    }

    public void setTrainingYears(int trainingYears) {
        this.trainingYears = trainingYears;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
        return getWeight() == that.getWeight() &&
                getHeight() == that.getHeight() &&
                isGender() == that.isGender() &&
                getTrainingYears() == that.getTrainingYears() &&
                getAge() == that.getAge() &&
                getPoints() == that.getPoints() &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(getEmail(), that.getEmail()) &&
                Objects.equals(getPassword(), that.getPassword()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getRole(), that.getRole()) &&
                Objects.equals(getPicture(), that.getPicture());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getEmail(), getPassword(), getName(), getRole(), getPicture(), getWeight(), getHeight(), isGender(), getTrainingYears(), getAge(), getPoints());
    }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", role='" + role + '\'' +
                ", picture='" + picture + '\'' +
                ", weight=" + weight +
                ", height=" + height +
                ", gender=" + gender +
                ", trainingYears=" + trainingYears +
                ", age=" + age +
                ", points=" + points +
                '}';
    }
}
