package com.example.PersonalDevelopment.controller;

import com.example.PersonalDevelopment.entity.Calender;
import com.example.PersonalDevelopment.entity.Customer;
import com.example.PersonalDevelopment.entity.DataAnalysis;
import com.example.PersonalDevelopment.entity.Sales;
import com.example.PersonalDevelopment.from.InsertForm;
import com.example.PersonalDevelopment.service.CustomerService;
import com.example.PersonalDevelopment.service.SalesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ManagementRestController {

    @Autowired
    private SalesService salesService;
    @Autowired
    private CustomerService customerService;

    @GetMapping("/api/sales/{divisionName}/Day")
    public List<Sales> dateSalesAll(@PathVariable("divisionName") String divisionName) {
        if(divisionName.equals("ALL")){
            return salesService.salesInfoAll();
        }else{
            return salesService.salesListDivision(divisionName);
        }

    }
    @GetMapping("/api/sales/{diviName}/{date}")
    public List<Sales> dateSales(@PathVariable("diviName") String diviName,@PathVariable("date") String date) {
        System.out.println(date);
        Calender[] calenders;
        if(date.contains("~")){
            var dates = date.split("~");
            calenders = new Calender[]{new Calender(dates[0]), new Calender(dates[1])};
        }else{
            calenders = new Calender[]{new Calender(date)};
        }
        System.out.println(calenders[0].getYear());
        System.out.println(calenders[0].getMonth());
        System.out.println(calenders[0].getDay());
        System.out.println(calenders[0].getStatus());
        System.out.println("length:" + calenders.length);

        return salesService.apiSalesInfoAll(calenders,diviName);
    }

    @GetMapping("/api/salesAnalysis/{date}")
    public List<DataAnalysis> salesAnalysis(@PathVariable("date") String date) {
        System.out.println(date);

        var list = salesService.apiSalesAnalysis(date);
        list.stream().forEach(System.out::println);
        return list;
    }
    @GetMapping("/api/salesAnalysisDivision/{name}")
    public List<DataAnalysis> apiSalesAnalysisDivision(@PathVariable("name") String name) {

        var list = salesService.apiSalesAnalysisDivision(name);
        list.stream().forEach(System.out::println);
        return list;
    }

    @GetMapping("/api/salesCustomer")
    public List<Customer> salesCustomer() {
        return customerService.customerList();
    }

    @PostMapping("/api/salesInsert")
    public int salesInsert(@Validated @ModelAttribute("insertForm")InsertForm insertForm) {
        System.out.println(insertForm.getDivisionName());
        System.out.println(insertForm.getDate());
        System.out.println(insertForm.getCustomerName());
        System.out.println(insertForm.getProduct());
        System.out.println(insertForm.getCost());
        System.out.println(insertForm.getPrice());


        var customerName = insertForm.getCustomerName();
        var customerList = customerService.customerList();
        if(customerList.stream().noneMatch(str -> str.getCustomerName().equals(customerName))){
            //新規登録
            System.out.println("insert");
//            customerService.customerInsert(customerName);
        }

        return 0;
//        return salesService.insert(insertForm);
    }

    @PutMapping("/api/salesUpdate")
    public int salesUpdate(@ModelAttribute("insertForm")InsertForm insertForm) {
        System.out.println(insertForm.getId());
        System.out.println(insertForm.getDivisionName());
        System.out.println(insertForm.getDate());
        System.out.println(insertForm.getCustomerName());
        System.out.println(insertForm.getProduct());
        System.out.println(insertForm.getCost());
        System.out.println(insertForm.getPrice());


        return salesService.update(insertForm);
    }

    @DeleteMapping("/api/salesDelete/{id}")
    public int salesDelete(@PathVariable("id") int id) {

        System.out.println(id);
        return salesService.delete(id);
    }
}
