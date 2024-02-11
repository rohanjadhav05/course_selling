package com.ey.springboot3security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.dto.Response;
import com.ey.springboot3security.mapper.ModleMapper;
import com.ey.springboot3security.service.CourseService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class CourseController {
	
	@Autowired 
	private CourseService courseService;
	
	@PostMapping("/addCourse")
	public ResponseEntity<?> createNewCourse(@RequestBody CourseDto courseDto){
		CourseDto savedCourseDto = courseService.addCourse(courseDto);
		return Response.success(ModleMapper.mapToCourse(savedCourseDto));
	}
	
	@PutMapping("/updateCourse")
	public ResponseEntity<?> updateCourseApi(@RequestBody CourseDto courseDto){
		return Response.success(courseService.updateCourse(courseDto.getCourseId(), courseDto));
	}
	
}
