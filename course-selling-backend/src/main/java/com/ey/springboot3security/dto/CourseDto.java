package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {
	
	private Integer courseId;
	private String courseName;
	private String courseDesc;
	private Integer coursePrice;
	private String courseImage;
	private boolean isPublished;
}
