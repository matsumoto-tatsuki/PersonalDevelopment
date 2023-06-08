package com.example.PersonalDevelopment.service;

import com.example.PersonalDevelopment.dao.SalesDao;
import com.example.PersonalDevelopment.entity.Calender;
import com.example.PersonalDevelopment.entity.DataAnalysis;
import com.example.PersonalDevelopment.entity.Sales;
import com.example.PersonalDevelopment.from.InsertForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalesService {

    @Autowired
    private SalesDao salesDao;


    public List<Sales> salesInfoAll(){
        return salesDao.salesInfoAll();
    }

    public List<Sales> apiSalesInfoAll(Calender[] calenders,String name){
        return salesDao.apiSalesInfoAll(calenders,name);
    }

    public List<DataAnalysis> apiSalesAnalysis(String name){
        return salesDao.apiSalesAnalysis(name);
    }
    public List<DataAnalysis> apiSalesAnalysisDivision(String name){
        return salesDao.apiSalesAnalysisDivision(name);
    }

    public List<Sales> salesListDivision(String name){
        return salesDao.salesListDivision(name);
    }

    public Sales salesInfoById(int id){
        return salesDao.salesInfoById(id);
    }

    public int insert(InsertForm insertForm){
        return salesDao.insert(insertForm);
    }

    public int update(InsertForm insertForm){
        return salesDao.update(insertForm);
    }

    public int delete(int id){
        return salesDao.delete(id);
    }


}
