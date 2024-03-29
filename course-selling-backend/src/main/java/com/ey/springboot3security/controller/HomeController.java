package com.ey.springboot3security.controller;

import java.text.ParseException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ey.springboot3security.dto.LoginResponeDto;
import com.ey.springboot3security.dto.Response;
import com.ey.springboot3security.dto.UserDto;
import com.ey.springboot3security.dto.UserInfoDto;
import com.ey.springboot3security.entity.AuthRequest;
import com.ey.springboot3security.entity.UserInfo;
import com.ey.springboot3security.mapper.ModleMapper;
import com.ey.springboot3security.repository.UserInfoRepository;
import com.ey.springboot3security.service.JwtService;
import com.ey.springboot3security.service.UserInfoService;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.jwt.SignedJWT;
import org.json.JSONObject;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/home")
@CrossOrigin("*")
public class HomeController {

	@Autowired
	private UserInfoService service;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserInfoRepository userRepo;

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome this endpoint is not secure";
	}

	@PostMapping("/signup")
	public ResponseEntity<?> addNewUser(@RequestBody UserDto userDto) {
		UserInfo user = ModleMapper.maptoUser(userDto);
		return Response.success(service.addUser(user));
	}

	@PostMapping("/googleSuccess")
	public ResponseEntity<?> googleSuccess(@RequestBody String cred) {
		String[] tokenParts = cred.split("\\.");
        String header = tokenParts[0];
        String payload = tokenParts[1];

        // Base64 decode the payload
        byte[] decodedPayload = Base64.getDecoder().decode(payload);
        String decodedPayloadStr = new String(decodedPayload);

        // Parse the JSON payload
        JSONObject payloadObj = new JSONObject(decodedPayloadStr);
        
        String email = payloadObj.getString("email");
        UserDto userDto = new UserDto();
        userDto.setEmail(email);
        userDto.setName(email);
        userDto.setRoles("ROLE_USER");
        UserInfo savedUser = null;
		if(userRepo.findByEmail(email).size() == 0) {
			UserInfo user = ModleMapper.maptoUser(userDto);
			savedUser = service.addUser(user);
		}
		else{
			savedUser = userRepo.findByEmail(email).get(0);
		}
		LoginResponeDto loginDto = new LoginResponeDto(savedUser.getId(), savedUser.getName(), savedUser.getEmail(),
				savedUser.getRoles(), jwtService.generateToken(email));
		return Response.success(loginDto);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		System.out.println("======== : " + authRequest.toString());
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			Optional<UserInfo> userInfo = userRepo.findByName(authRequest.getUsername());
			UserInfo user = userInfo.get();
			LoginResponeDto loginDto = new LoginResponeDto(user.getId(), user.getName(), user.getEmail(),
					user.getRoles(), jwtService.generateToken(authRequest.getUsername()));
			System.out.println("-------- Login Dto : "+loginDto.toString());
			return Response.success(loginDto);
		} else {
			throw new UsernameNotFoundException("invalid user request !");
		}
	}

	@GetMapping("/userExist/{name}")
	public ResponseEntity<?> checkIfUserExits(@PathVariable("name") String name) {
		Optional<UserInfo> userInfo = userRepo.findByName(name);
		if (userInfo.isPresent()) {
			return Response.success(true);
		} else {
			return Response.error("User doesn't Exists");
		}
	}

	@PutMapping("/changePassword")
	public ResponseEntity<?> changePassword(@RequestBody AuthRequest authRequest) {
		Optional<UserInfo> userInfo = userRepo.findByName(authRequest.getUsername());
		if (userInfo.isPresent()) {
			service.changePassword(authRequest);
			return Response.success("Password Changed Successfully");
		} else {
			return Response.error("User Doesn't Exists");
		}

	}

}
