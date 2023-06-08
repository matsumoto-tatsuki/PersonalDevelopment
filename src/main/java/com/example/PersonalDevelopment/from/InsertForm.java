package com.example.PersonalDevelopment.from;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class InsertForm {
    @NotBlank
    private  String id;
    @NotBlank
    private String divisionName;
    @NotBlank
    private String date;
    @NotBlank
    private String customerName;
    @NotBlank
    private String product;
    @NotBlank
    @Pattern(regexp = "\\d+")
    private String cost;
    @NotBlank
    @Pattern(regexp = "\\d+")
    private String price;
}
