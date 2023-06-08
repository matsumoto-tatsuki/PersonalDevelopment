package com.example.PersonalDevelopment.entity;

public class Sales {

    private int id;
    private String customerName;

    private String divisionName;

    private String product;

    private int cost;

    private int price;

    private String date;

    public Sales(int id,String customerName, String divisionName, String product, int cost, int price, String date) {
        this.id = id;
        this.customerName = customerName;
        this.divisionName = divisionName;
        this.product = product;
        this.cost = cost;
        this.price = price;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDivisionName() {
        return divisionName;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
