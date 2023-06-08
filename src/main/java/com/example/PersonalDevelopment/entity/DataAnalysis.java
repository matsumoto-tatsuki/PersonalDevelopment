package com.example.PersonalDevelopment.entity;

public class DataAnalysis {
    private String divisionName;
    private String monthDate;
    private int returns;

    public DataAnalysis(String divisionName, String monthDate, int returns) {
        this.divisionName = divisionName;
        this.monthDate = monthDate;
        this.returns = returns;
    }

    public String getDivisionName() {
        return divisionName;
    }

    public void setDivisionName(String divisionName) {
        this.divisionName = divisionName;
    }

    public String getDate() {
        return monthDate;
    }

    public void setMonthDate(String monthDate) {
        this.monthDate = monthDate;
    }

    public int getReturns() {
        return returns;
    }

    public void setReturns(int returns) {
        this.returns = returns;
    }
}
