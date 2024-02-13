package com.ey.springboot3security.service;

import java.util.Map;

import com.ey.springboot3security.dto.CourseDto;

public interface CourseService {
	CourseDto addCourse(CourseDto courseDto);
	
	CourseDto updateCourse(int courseId, CourseDto courseDto);
	
	String publishCourse(Integer id);
	
	String deleteCourse(Integer id);
	
	CourseDto getCourse(Integer id);
	
}
	