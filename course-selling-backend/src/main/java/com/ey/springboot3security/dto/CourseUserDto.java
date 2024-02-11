package com.ey.springboot3security.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CourseUserDto {
	
	private Integer courseUserId;
    private Integer mappedUserId;
    private Integer mappedCourseId;
}
