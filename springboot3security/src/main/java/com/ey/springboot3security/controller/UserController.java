package com.ey.springboot3security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.springboot3security.dto.Response;
import com.ey.springboot3security.service.CourseServiceImpl;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired 
	private CourseServiceImpl courseServiceImpl; 
	
	@GetMapping("/courses")
	public ResponseEntity<?> PublishedCourses(){
		return Response.success(courseServiceImpl.getPublishedCourse()) ;
	}
}
