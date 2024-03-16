package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnaylsisDto {
	public String courseName;
	public Long noOfStudents;
	public Long totalAmount;
}
