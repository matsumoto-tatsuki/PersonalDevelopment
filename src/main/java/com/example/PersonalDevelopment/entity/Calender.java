package com.example.PersonalDevelopment.entity;

import java.time.LocalDate;
import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.Temporal;
import java.util.Date;

public class Calender {
    private Temporal calender;
    private int year;
    private int month;
    private int day;
    private int status;

    public Calender(String date){
//        this.calender = date;
        LocalDate date1 = null;
        YearMonth date2 = null;
        Year date3 = null;

        if (date.length() == 10) {
            // "yyyy-MM-dd"形式の場合
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            this.calender = LocalDate.parse(date, formatter);
        } else if (date.length() == 7) {
            // "yyyy-MM"形式の場合
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
            this.calender = YearMonth.parse(date, formatter);
        } else if (date.length() == 4) {
            // "yyyy"形式の場合
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy");
            this.calender = Year.parse(date, formatter);
        } else {
            this.calender = null;
        }


        var calender = date.split("-");
        this.status = calender.length;
        switch (status){
            case 3:
                this.day = Integer.parseInt(calender[2]);
            case 2:
                this.month = Integer.parseInt(calender[1]);
            case 1:
                this.year = Integer.parseInt(calender[0]);
        }
    }

    public int getYear() {
        return year;
    }

    public int getMonth() {
        return month;
    }

    public int getDay() {
        return day;
    }

    public int getStatus() {
        return status;
    }

    public Temporal getCalender() {
        return calender;
    }
}
