package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
	
	private int courseId;
	private String courseName;
	private String courseDesc;
	private int coursePrice;
	private boolean isPublished;
}
