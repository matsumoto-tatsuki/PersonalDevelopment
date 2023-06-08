package com.example.PersonalDevelopment.controller;

import com.example.PersonalDevelopment.entity.User;
import com.example.PersonalDevelopment.from.LoginForm;
import com.example.PersonalDevelopment.service.CustomerService;
import com.example.PersonalDevelopment.service.SalesService;
import com.example.PersonalDevelopment.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class ManagementController {

    @Autowired
    private UserService userService;

    @Autowired
    private SalesService salesService;

    @Autowired
    private CustomerService customerService;
    @Autowired
    private HttpSession session;

    @GetMapping("/user-login")
    public String loginIndex(@ModelAttribute("loginForm") LoginForm loginForm){
        return "/login";
    }

    @PostMapping("/user-login")
    public String loginIndex(Model model, @Validated @ModelAttribute("loginForm") LoginForm loginForm, BindingResult bindingResult){
        if(bindingResult.hasErrors()) {
            return "/login";
        }

        System.out.println("loginCheck:" + loginForm.getLoginId());
        System.out.println("loginCheck:" + loginForm.getPassword());
        var user = userService.loginCheck(loginForm);

        if(user == null){
            model.addAttribute("error","IDまたはパスワードが不正です");
            return "/login";
        }
        System.out.println(user.getLoginId());
        System.out.println(user.getPassword());
        System.out.println(user.getName());
        System.out.println(user.getRole());

        session.setAttribute("user", user);
        session.setAttribute("userName", user.getName());

        System.out.println(session.getAttribute("user"));
        System.out.println(session.getAttribute("userName"));
        if(user.getRole() == 1){
            return "redirect:/topPage";
        }else{
            return "redirect:/home";
        }

    }

    @GetMapping("/topPage")
    public String topIndex(Model model){
        var list = salesService.salesInfoAll();
        System.out.println(list);
        model.addAttribute("salesList",list);
        var price = list.stream().mapToInt(value -> value.getPrice() - value.getCost()).sum();
        System.out.println(price);
        model.addAttribute("date","全体");
        model.addAttribute("returns",price);
        return "/role1Index";
    }

    @GetMapping("/gurahuIndex")
    public String gurahuIndex(){
        return "/gurahu";
    }


    @GetMapping("/home")
    public String homeIndex(Model model){
        return "/role2Index";
    }

    @GetMapping("/salesDisplayIndex")
    public String salesList(Model model){
        var list = salesService.salesListDivision((String) session.getAttribute("userName"));

        model.addAttribute("salesList",list);
        var price = list.stream().mapToInt(value -> value.getPrice() - value.getCost()).sum();
        model.addAttribute("date","全体");
        model.addAttribute("returns",price);

        return "/salesList";
    }

    @GetMapping("/salesDetail/{id}")
    public String salesDetail(Model model,@PathVariable("id") int id){
        var salesInfo = salesService.salesInfoById(id);
        model.addAttribute("salesList",salesInfo);
        model.addAttribute("salesId",id);
        return "/salesDetail";
    }


    @GetMapping("/salesInputIndex")
    public String salesInputIndex(Model model){
        var list = customerService.customerList();
        model.addAttribute("customerList",list);

        return "/salesInput";
    }

    @GetMapping("/salesUpdateIndex/{id}")
    public String salesUpdateIndex(Model model,@PathVariable("id") int id){
        var salesInfo = salesService.salesInfoById(id);
        model.addAttribute("sales",salesInfo);
        var list = customerService.customerList();
        model.addAttribute("customerList",list);
        return "/salesUpdate";
    }

    @GetMapping("/user-logout")
    public String userLogout(){
        session.removeAttribute("user");
        session.removeAttribute("userName");
        return "/logout";
    }

    @GetMapping("/rolePage")
    public String topPage(){
        var user = (User) session.getAttribute("user");
        if(user.getRole() == 1){
            return "redirect:/topPage";
        }else{
            return "redirect:/home";
        }
    }


    @GetMapping("/salesLineBar")
    public String lineBar(){
        return "/gurahu2";
    }


}
