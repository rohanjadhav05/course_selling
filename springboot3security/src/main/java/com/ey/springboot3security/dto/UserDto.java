package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

	private int id; 
	private String name; 
	private String email; 
	private String password; 
	private String roles;
}
