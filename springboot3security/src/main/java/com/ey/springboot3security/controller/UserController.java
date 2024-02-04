package com.ey.springboot3security.controller;

import com.ey.springboot3security.dto.Response;
import com.ey.springboot3security.entity.AuthRequest; 
import com.ey.springboot3security.entity.UserInfo; 
import com.ey.springboot3security.service.JwtService; 
import com.ey.springboot3security.service.UserInfoService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.web.bind.annotation.*; 

@RestController
@RequestMapping("/home") 
public class UserController { 

	@Autowired
	private UserInfoService service; 

	@Autowired
	private JwtService jwtService; 

	@Autowired
	private AuthenticationManager authenticationManager; 

	@GetMapping("/welcome") 
	public String welcome() { 
		return "Welcome this endpoint is not secure"; 
	} 

	@PostMapping("/signup") 
	public ResponseEntity<?> addNewUser(@RequestBody UserInfo userInfo) { 
		return Response.success(service.addUser(userInfo)); 
	} 

//	@GetMapping("/user/userProfile") 
//	@PreAuthorize("hasAuthority('ROLE_USER')") 
//	public String userProfile() { 
//		return "Welcome to User Profile"; 
//	} 

//	@GetMapping("/admin/adminProfile") 
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')") 
//	public String adminProfile() { 
//		return "Welcome to Admin Profile"; 
//	} 

	@PostMapping("/login") 
	public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) { 
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())); 
		if (authentication.isAuthenticated()) {  
			return Response.success(jwtService.generateToken(authRequest.getUsername())); 
		} else { 
			throw new UsernameNotFoundException("invalid user request !"); 
		} 
	} 

} 

