package com.ey.springboot3security.service;

import java.util.Map;

import com.ey.springboot3security.dto.CourseDto;

public interface CourseService {
	CourseDto addCourse(CourseDto courseDto);
	
	Map<String, Object> updateCourse(int courseId, CourseDto courseDto);
}
