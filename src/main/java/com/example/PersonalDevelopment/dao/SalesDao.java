package com.example.PersonalDevelopment.dao;

import com.example.PersonalDevelopment.entity.Calender;
import com.example.PersonalDevelopment.entity.DataAnalysis;
import com.example.PersonalDevelopment.entity.Sales;
import com.example.PersonalDevelopment.from.InsertForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.DataClassRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SalesDao {

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;


    public List<Sales> salesInfoAll(){
        System.out.println("SalesDaoCheck(salesInfoAll)");
        return jdbcTemplate.query("SELECT s.id id" +
                                    "       ,customer_name customerName\n" +
                                    "       ,division_name divisionName\n" +
                                    "       ,product \n" +
                                    "       ,cost\n" +
                                    "       ,price\n" +
                                    "       ,date\n" +
                                    " FROM sales s\n" +
                                    " JOIN customer c\n" +
                                    " ON s.customer_id = c.customer_id\n" +
                                    " JOIN division d\n" +
                                    " ON d.division_id = s.division_id\n" +
                                    " ORDER BY date;\n",
                new DataClassRowMapper<>(Sales.class));
    }

    public Sales salesInfoById(int id){
        System.out.println("SalesDaoCheck(salesInfoById)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id",id);
        var list = jdbcTemplate.query("SELECT s.id id" +
                        "       ,customer_name customerName\n" +
                        "       ,division_name divisionName\n" +
                        "       ,product \n" +
                        "       ,cost\n" +
                        "       ,price\n" +
                        "       ,date\n" +
                        " FROM sales s\n" +
                        " JOIN customer c\n" +
                        " ON s.customer_id = c.customer_id\n" +
                        " JOIN division d\n" +
                        " ON d.division_id = s.division_id\n" +
                        " WHERE s.id = :id\n" +
                        " ORDER BY date;\n",param,
                new DataClassRowMapper<>(Sales.class));
        return list.isEmpty() ? null : list.get(0);
    }

    public List<Sales> apiSalesInfoAll(Calender[] calender,String name){
        System.out.println("SalesDaoCheck(apiSalesInfoAll)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        String diviName = name.equals("ALL") ? " " :" AND division_name = :name\n";
        if(calender.length > 1) {
            System.out.println(calender[0].getCalender());
            System.out.println(calender[1].getCalender());
            param.addValue("dateA", calender[0].getCalender());
            param.addValue("dateB", calender[1].getCalender());
            param.addValue("name",name);
            return jdbcTemplate.query("SELECT s.id id" +
                            "       ,customer_name customerName\n" +
                            "       ,division_name divisionName\n" +
                            "       ,product \n" +
                            "       ,cost\n" +
                            "       ,price\n" +
                            "       ,date\n" +
                            " FROM sales s\n" +
                            " JOIN customer c\n" +
                            " ON s.customer_id = c.customer_id\n" +
                            " JOIN division d\n" +
                            " ON d.division_id = s.division_id\n" +
                            " WHERE date BETWEEN :dateA AND :dateB\n" +
                            diviName +
                            " ORDER BY date",param,
                    new DataClassRowMapper<>(Sales.class));
        }else{
            String where = null;
            switch (calender[0].getStatus()){
                case 3:
                    where = " WHERE EXTRACT(YEAR FROM date) = :year AND EXTRACT(MONTH FROM date) = :month AND EXTRACT(DAY FROM date) = :day";
                    break;
                case 2:
                    where = " WHERE EXTRACT(YEAR FROM date) = :year AND EXTRACT(MONTH FROM date) = :month";
                    break;
                case 1:
                    where = " WHERE EXTRACT(YEAR FROM date) = :year";
            }
            param.addValue("year", calender[0].getYear());
            param.addValue("month", calender[0].getMonth());
            param.addValue("day", calender[0].getDay());
            param.addValue("name",name);
            return jdbcTemplate.query("SELECT s.id id" +
                            "       ,customer_name customerName\n" +
                            "       ,division_name divisionName\n" +
                            "       ,product \n" +
                            "       ,cost\n" +
                            "       ,price\n" +
                            "       ,date\n" +
                            " FROM sales s\n" +
                            " JOIN customer c\n" +
                            " ON s.customer_id = c.customer_id\n" +
                            " JOIN division d\n" +
                            " ON d.division_id = s.division_id\n" +
                            where +
                            diviName +
                            " ORDER BY date",param,
                    new DataClassRowMapper<>(Sales.class));
        }
    }

    public List<DataAnalysis> apiSalesAnalysis(String selected){
        System.out.println("SalesDaoCheck(apiSalesAnalysis)");

        return jdbcTemplate.query("SELECT division_name divisionName \n" +
                        "       ,CASE\n" +
                        "        WHEN date BETWEEN '2023/04/01' AND '2023/04/30' THEN '2023-04'\n" +
                        "        WHEN date BETWEEN '2023/05/01' AND '2023/05/31' THEN '2023-05'\n" +
                        "        WHEN date BETWEEN '2023/06/01' AND '2023/06/30' THEN '2023-06'\n" +
                        "        WHEN date BETWEEN '2023/07/01' AND '2023/07/31' THEN '2023-07'\n" +
                        "        WHEN date BETWEEN '2023/08/01' AND '2023/08/31' THEN '2023-08'\n" +
                        "        WHEN date BETWEEN '2023/09/01' AND '2023/09/30' THEN '2023-09'\n" +
                        "       END as monthDate\n" +
                        "       ,SUM(price - cost) returns\n" +
                        " FROM sales s\n" +
                        " JOIN customer c\n" +
                        " ON s.customer_id = c.customer_id\n" +
                        " JOIN division d\n" +
                        " ON d.division_id = s.division_id\n" +
                        " GROUP BY division_name,monthDate\n" +
                        " ORDER BY division_name",
                new DataClassRowMapper<>(DataAnalysis.class));
    }

    public List<DataAnalysis> apiSalesAnalysisDivision(String divisionName){
        System.out.println("SalesDaoCheck(apiSalesAnalysisDivision)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("divisionName",divisionName);
        return jdbcTemplate.query("SELECT division_name divisionName \n" +
                        "       ,CASE\n" +
                        "        WHEN date BETWEEN '2023/04/01' AND '2023/04/30' THEN '2023-04'\n" +
                        "        WHEN date BETWEEN '2023/05/01' AND '2023/05/31' THEN '2023-05'\n" +
                        "        WHEN date BETWEEN '2023/06/01' AND '2023/06/30' THEN '2023-06'\n" +
                        "        WHEN date BETWEEN '2023/07/01' AND '2023/07/31' THEN '2023-07'\n" +
                        "        WHEN date BETWEEN '2023/08/01' AND '2023/08/31' THEN '2023-08'\n" +
                        "        WHEN date BETWEEN '2023/09/01' AND '2023/09/30' THEN '2023-09'\n" +
                        "       END as monthDate\n" +
                        "       ,SUM(price - cost) returns\n" +
                        " FROM sales s\n" +
                        " JOIN customer c\n" +
                        " ON s.customer_id = c.customer_id\n" +
                        " JOIN division d\n" +
                        " ON d.division_id = s.division_id\n" +
                        " WHERE division_name = :divisionName\n" +
                        " GROUP BY division_name,monthDate\n" +
                        " ORDER BY division_name",param,
                new DataClassRowMapper<>(DataAnalysis.class));
    }



    public List<Sales> salesListDivision(String name){
        System.out.println("SalesDaoCheck(salesListDivision)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("name",name);
        return jdbcTemplate.query("SELECT s.id id" +
                        "       ,customer_name customerName\n" +
                        "       ,division_name divisionName\n" +
                        "       ,product \n" +
                        "       ,cost\n" +
                        "       ,price\n" +
                        "       ,date\n" +
                        " FROM sales s\n" +
                        " JOIN customer c\n" +
                        " ON s.customer_id = c.customer_id\n" +
                        " JOIN division d\n" +
                        " ON d.division_id = s.division_id\n" +
                        " WHERE division_name = :name\n" +
                        " ORDER BY date;\n",param,
                new DataClassRowMapper<>(Sales.class));
    }

    public int insert(InsertForm insertForm){
        System.out.println("SalesDaoCheck(insert)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("customerName",insertForm.getCustomerName());
        param.addValue("divisionName",insertForm.getDivisionName());
        param.addValue("product",insertForm.getProduct());
        param.addValue("cost",Integer.parseInt(insertForm.getCost()));
        param.addValue("price",Integer.parseInt(insertForm.getPrice()));
        var calender = new Calender(insertForm.getDate());
        param.addValue("date",calender.getCalender());


        return jdbcTemplate.update("INSERT INTO sales(customer_id,division_id,product,cost,price,date)\n" +
                                        "VALUES\n" +
                                        "((SELECT customer_id FROM customer  WHERE customer_name = :customerName)\n" +
                                        " ,(SELECT division_id FROM division WHERE division_name = :divisionName)\n" +
                                        " ,:product,:cost,:price,:date)",param);
    }


    public int update(InsertForm insertForm){
        System.out.println("SalesDaoCheck(update)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id",Integer.parseInt(insertForm.getId()));
        param.addValue("customerName",insertForm.getCustomerName());
        param.addValue("product",insertForm.getProduct());
        param.addValue("cost",Integer.parseInt(insertForm.getCost()));
        param.addValue("price",Integer.parseInt(insertForm.getPrice()));
        var calender = new Calender(insertForm.getDate());
        param.addValue("date",calender.getCalender());


        return jdbcTemplate.update("UPDATE sales\n" +
                                        " SET customer_id = (SELECT customer_id FROM customer  WHERE customer_name = :customerName)\n" +
                                        "     ,product = :product\n" +
                                        "     ,cost = :cost\n" +
                                        "     ,price = :price\n" +
                                        "     ,date = :date\n" +
                                        " WHERE id = :id",param);
    }

    public int delete(int id){
        System.out.println("SalesDaoCheck(delete)");
        MapSqlParameterSource param = new MapSqlParameterSource();
        param.addValue("id",id);

        return jdbcTemplate.update("DELETE FROM sales WHERE id = :id",param);
    }


}
