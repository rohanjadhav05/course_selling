package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseUserDto {
	
	private Long courseUserId;
    private int mappedUserId;
    private int mappedCourseId;
}
