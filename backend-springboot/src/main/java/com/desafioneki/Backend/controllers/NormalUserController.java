package com.desafioneki.Backend.controllers;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desafioneki.Backend.dtos.UserCreateDto;
import com.desafioneki.Backend.dtos.LoginDto;
import com.desafioneki.Backend.models.NormalUser;
import com.desafioneki.Backend.services.NormalUserService;

@RestController
@RequestMapping("/api/normalusers")
@CrossOrigin(origins = "*")
public class NormalUserController {
	
	@Autowired
	private NormalUserService serv;

	@GetMapping("/ping")
	public String testEndpoint() {
		return "pong!";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDto dto) {
		System.out.println("Attempting login for email: " + dto.getEmail());
		
		try {
			NormalUser user = serv.login(dto);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
	        Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", "Invalid credentials");
	        return ResponseEntity.status(401).body(errorResponse);
		}

	}
	
	@PostMapping("/signup")
	public ResponseEntity<Object> signUp(@RequestBody UserCreateDto dto) {
		try {
			NormalUser createdUser = serv.createUser(dto);	
			return ResponseEntity.status(201).body(createdUser);
		} catch (Exception e) {
	        Map<String, String> errorResponse = new HashMap<String, String>();
	        errorResponse.put("error", "Invalid credentials");
	        return ResponseEntity.status(401).body(errorResponse);
		}
		
		
	}
}
