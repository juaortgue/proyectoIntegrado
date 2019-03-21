package com.example.fittrain.dto;

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
    private String email;
    private String role;
    private String password;
    private String name;
    private int age;
    private int weight;
    private int height;
    private boolean gender;
    private int trainingYears;

    public UserEditDto() {
    }

    public UserEditDto(String email, String role, String password, String name, int age, int weight, int height, boolean gender, int trainingYears) {
        this.email = email;
        this.role = role;
        this.password = password;
        this.name = name;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.trainingYears = trainingYears;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
}
