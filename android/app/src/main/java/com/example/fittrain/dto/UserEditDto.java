package com.example.fittrain.dto;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.Objects;

public class UserEditDto {
    /*	"email": "admin2@gmail.com",
	"role": "admin",
	"password": "12345678",
	"name": "admin3",
	"age": 18,
	"weight": 70,
	"height": 174,
	"gender": false,
	"trainingYears": 5*/

    private String name;
    private int age;
    private int weight;
    private int height;
    private boolean gender;
    private int trainingYears;
    private int points;

    public UserEditDto() {
    }

    public UserEditDto(String name, int age, int weight, int height, boolean gender, int trainingYears, int points) {
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.trainingYears = trainingYears;
        this.points = points;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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
        UserEditDto that = (UserEditDto) o;
        return getAge() == that.getAge() &&
                getWeight() == that.getWeight() &&
                getHeight() == that.getHeight() &&
                isGender() == that.isGender() &&
                getTrainingYears() == that.getTrainingYears() &&
                getPoints() == that.getPoints() &&
                Objects.equals(getName(), that.getName());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getName(), getAge(), getWeight(), getHeight(), isGender(), getTrainingYears(), getPoints());
    }

    @Override
    public String toString() {
        return "UserEditDto{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", weight=" + weight +
                ", height=" + height +
                ", gender=" + gender +
                ", trainingYears=" + trainingYears +
                ", points=" + points +
                '}';
    }
}
