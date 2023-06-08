package com.example.PersonalDevelopment.dao;

import com.example.PersonalDevelopment.entity.Customer;
import com.example.PersonalDevelopment.entity.Sales;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDao {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;


    public List<Customer> customerList(){
        System.out.println("CustomerDaoCheck(customerList)");
        return jdbcTemplate.query("SELECT customer_id customerId\n" +
                                    "        ,customer_name customerName\n" +
                                    " FROM customer\n" +
                                    " ORDER BY customer_id;",
                new DataClassRowMapper<>(Customer.class));
    }

    public int customerInsert(String name){
        System.out.println("CustomerDaoCheck(customerInsert)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("name",name);
        return jdbcTemplate.update("INSERT INTO customer(customer_name)\n" +
                                        "VALUES\n" +
                                        "(:name)",param);
    }
}
