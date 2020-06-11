package com.abdelboutar.abdelboutarservice.controller;

import com.abdelboutar.abdelboutarservice.model.EsResponse;
import com.abdelboutar.abdelboutarservice.model.JwtResponse;
import com.abdelboutar.abdelboutarservice.model.User;
import com.abdelboutar.abdelboutarservice.service.JwtUserDetailsService;
import com.abdelboutar.abdelboutarservice.service.UserService;
import com.abdelboutar.abdelboutarservice.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

/**
 * Copyright (c) 2018. scicom.com.my - All Rights Reserved
 * Created by kalana.w on 5/8/2020.
 */
@RestController
@RequestMapping("session/")
public class UserAuthController {
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;

	@Autowired
	private UserService userService;

	@PostMapping("authenticate")
	public ResponseEntity<EsResponse> createAuthenticationToken(@RequestHeader String username, @RequestHeader String password) throws Exception {

		authenticate(username, password);
		final UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
		final String token = this.jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(new EsResponse<>(1, new JwtResponse(token), "authentication success"));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}

	@PostMapping("register")
	public ResponseEntity<EsResponse<User>> createNewUser(@RequestBody User user) {
		return ResponseEntity.ok(this.userService.createNewUser(user));
	}
}
