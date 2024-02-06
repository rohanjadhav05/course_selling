package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CourseResponseDto {
	private Integer courseId;
	private String courseName;
	private String courseDesc;
	private Integer coursePrice;
}
