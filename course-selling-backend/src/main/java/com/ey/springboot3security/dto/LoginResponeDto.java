package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginResponeDto {
	private Integer id; 
	private String name; 
	private String email; 
	private String roles;
	private String jwtToken;
}
