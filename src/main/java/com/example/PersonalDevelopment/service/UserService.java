package com.example.PersonalDevelopment.service;

import com.example.PersonalDevelopment.dao.UserDao;
import com.example.PersonalDevelopment.entity.User;
import com.example.PersonalDevelopment.from.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public User loginCheck(LoginForm loginForm) {
        return userDao.loginCheck(loginForm);
    }
}
