package com.example.fittrain.util;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

public class ViewModelUser extends ViewModel {
    private final MutableLiveData<String> emailSelected = new MutableLiveData<String>();
    private final MutableLiveData<String> roleSelected = new MutableLiveData<String>();
    private final MutableLiveData<String> nameSelected = new MutableLiveData<String>();
    private final MutableLiveData<Integer> ageSelected = new MutableLiveData<Integer>();
    private final MutableLiveData<Integer> weightSelected = new MutableLiveData<Integer>();
    private final MutableLiveData<Integer> heightSelected = new MutableLiveData<Integer>();
    private final MutableLiveData<Boolean> genderSelected = new MutableLiveData<Boolean>();
    private final MutableLiveData<Integer> trainingYearsSelected = new MutableLiveData<Integer>();


    // Master > Detail (comunicación del dato)
    public void selectEmail(String email) {
        emailSelected.setValue(email);
    }

    public LiveData<String> getEmailSelected() {
        return emailSelected;
    }

    public void selectRole(String role) {
        roleSelected.setValue(role);
    }

    public LiveData<String> getSelectedRole() {
        return roleSelected;
    }

    public void selectName(String name) {
        nameSelected.setValue(name);
    }

    public LiveData<String> getSelectedName() {
        return nameSelected;
    }

    public void selectAge(Integer age) {
        ageSelected.setValue(age);
    }

    public LiveData<Integer> getSelectedage() {
        return ageSelected;
    }

    public void selectWeight(Integer weight) {
        weightSelected.setValue(weight);
    }

    public LiveData<Integer> getSelectedWeight() {
        return getSelectedWeight();
    }

    public void selectHeight(Integer height) {
        heightSelected.setValue(height);
    }

    public LiveData<Integer> getSelectedHeight() {
        return getSelectedHeight();
    }

    public void selectGender(Boolean gender) {
        genderSelected.setValue(gender);
    }

    public LiveData<Boolean> getSelectedGender() {
        return getSelectedGender();
    }

    public void selectTrainingYears(Integer years) {
        trainingYearsSelected.setValue(years);
    }

    public LiveData<Boolean> getSelectedTrainingYears() {
        return getSelectedTrainingYears();
    }






}
