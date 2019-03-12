package com.example.fittrain.ui.model;

import java.util.Objects;

public class UserResponse {
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

    public UserResponse() {
    }

    public UserResponse(String id, String email, String password, String name, String role, String picture, int weight, int height, boolean gender, int trainingYears) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
        return weight == that.weight &&
                height == that.height &&
                gender == that.gender &&
                trainingYears == that.trainingYears &&
                Objects.equals(id, that.id) &&
                Objects.equals(email, that.email) &&
                Objects.equals(password, that.password) &&
                Objects.equals(name, that.name) &&
                Objects.equals(role, that.role) &&
                Objects.equals(picture, that.picture);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, name, role, picture, weight, height, gender, trainingYears);
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
                '}';
    }
}
