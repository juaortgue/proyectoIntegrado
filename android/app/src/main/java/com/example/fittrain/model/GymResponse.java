package com.example.fittrain.model;

import android.os.Build;
import android.support.annotation.RequiresApi;

import java.util.Objects;

public class GymResponse {
    private String id;
    private String name;
    private String address;
    private int price;
    private String picture;
    private String province;
    private String city;
    private String zipcode;
    private String position;
    private String description;

    public GymResponse() {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
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
        GymResponse that = (GymResponse) o;
        return getPrice() == that.getPrice() &&
                Objects.equals(getId(), that.getId()) &&
                Objects.equals(getName(), that.getName()) &&
                Objects.equals(getAddress(), that.getAddress()) &&
                Objects.equals(getPicture(), that.getPicture()) &&
                Objects.equals(getProvince(), that.getProvince()) &&
                Objects.equals(getCity(), that.getCity()) &&
                Objects.equals(getZipcode(), that.getZipcode()) &&
                Objects.equals(getPosition(), that.getPosition()) &&
                Objects.equals(getDescription(), that.getDescription());
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getAddress(), getPrice(), getPicture(), getProvince(), getCity(), getZipcode(), getPosition(), getDescription());
    }

    @Override
    public String toString() {
        return "GymResponse{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", price=" + price +
                ", picture='" + picture + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", zipcode='" + zipcode + '\'' +
                ", position='" + position + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
