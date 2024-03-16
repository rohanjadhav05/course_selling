package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LoginResponeDto {
	private Integer id; 
	private String name; 
	private String email; 
	private String roles;
	private String jwtToken;
}
