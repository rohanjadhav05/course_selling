package com.ey.springboot3security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.springboot3security.dto.CourseUserDto;
import com.ey.springboot3security.dto.Response;
import com.ey.springboot3security.service.CourseService;
import com.ey.springboot3security.service.CourseServiceImpl;
import com.ey.springboot3security.service.CourseUserServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired 
	private CourseServiceImpl courseServiceImpl; 
	
	@Autowired
	private CourseUserServiceImpl courseUserServiceImpl;
	
	@Autowired 
	private CourseService courseService;
	
	@GetMapping("/courses")
	public ResponseEntity<?> PublishedCourses(){
		return Response.success(courseServiceImpl.getPublishedCourse()) ;
	}
	
	@PostMapping("/purchase")
	public ResponseEntity<?> PurchaseCourse(@RequestBody CourseUserDto courseUserDto){
		return Response.success(courseUserServiceImpl.purchaseCourseByUser(courseUserDto));
	}
	
	@GetMapping("/purchasedCourse/{userId}")
	public ResponseEntity<?> PurchasedCourseByUser(@PathVariable("userId") Integer userId){
		return Response.success(courseUserServiceImpl.getPurchasedCourse(userId));
	}
	
	@GetMapping("/getCourse/{id}")
	public ResponseEntity<?> getCourses(@PathVariable("id") Integer courseId){
		return Response.success(courseService.getCourse(courseId));
	}
}
