package com.example.PersonalDevelopment.service;

import com.example.PersonalDevelopment.dao.CustomerDao;
import com.example.PersonalDevelopment.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    public List<Customer> customerList(){
        return customerDao.customerList();
    }

    public int customerInsert(String name){
        return customerDao.customerInsert(name);
    }
}
