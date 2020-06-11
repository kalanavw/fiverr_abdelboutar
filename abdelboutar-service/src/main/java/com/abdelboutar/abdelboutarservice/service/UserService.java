package com.abdelboutar.abdelboutarservice.service;


import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.User;
import com.abdelboutar.abdelboutarservice.repository.IUserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

/**
 * Copyright (c) 2018. scicom.com.my - All Rights Reserved
 * Created by kalana.w on 5/8/2020.
 */
@Service
public class UserService {
    private static final Logger logger = LogManager.getLogger(UserService.class);
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    public EsResponse<User> createNewUser(User user) {
        user.setPassword(this.bcryptEncoder.encode(user.getPassword()));
        try {
            return new EsResponse<>(1, this.userRepository.save(user), "user created success");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("user created fail", e);
            return new EsResponse<>(-1, "user created fail");
        }
    }

    public Optional<User> findByUsername(String username) {
        return this.userRepository.findByEmail(username);
    }

    public EsResponse<?> findUsers(String username) {
        try {
            if (username != null && !username.trim().isEmpty()) {
                return new EsResponse<>(1, Arrays.asList(this.findByUsername(username).orElse(null)), "user found");
            }
            return new EsResponse<>(1, this.userRepository.findAll(), "users found");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("user search fail", e);
            return new EsResponse<>(-1, "user search fail");
        }
    }
}
