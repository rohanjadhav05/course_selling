package com.ey.springboot3security.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.springboot3security.dto.AnaylsisDto;
import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.entity.Courses;
import com.ey.springboot3security.exception.ResourceNotFoundException;
import com.ey.springboot3security.mapper.ModleMapper;
import com.ey.springboot3security.repository.CourseRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseServiceImpl implements CourseService {

	@Autowired
	private CourseRepository courseRepository;
	
	@Override
	public CourseDto addCourse(CourseDto courseDto) {
		Courses savedCourse = courseRepository.save(ModleMapper.mapToCourse(courseDto)); 
		return ModleMapper.mapToCourseDto(savedCourse);
	}

	@Override
	public CourseDto updateCourse(int courseId, CourseDto courseDto) {
		System.out.println("Course Dto : "+courseDto.toString());
		Courses fetchedCourse = courseRepository.findById(courseId)
									.orElseThrow(() -> new ResourceNotFoundException("Course with Id Dont't Exits"));
		fetchedCourse.setCourseName(courseDto.getCourseName());
		fetchedCourse.setCourseDesc(courseDto.getCourseDesc());
		fetchedCourse.setCoursePrice(courseDto.getCoursePrice());
		fetchedCourse.setCourseImage(courseDto.getCourseImage());
		fetchedCourse.setPublished(courseDto.isPublished());
		return ModleMapper.mapToCourseDto(courseRepository.save(fetchedCourse));
	}
	
	
	public List<CourseDto> getPublishedCourse(){
		List<Courses> listOfCourse = courseRepository.findByisPublished(true);
		List<CourseDto> courseDtoList = new ArrayList<>();
		for(Courses c : listOfCourse) {
			courseDtoList.add(ModleMapper.mapToCourseDto(c));
		}
		return courseDtoList;
	}
	
	public List<CourseDto> getAllCourses(){
		List<Courses> listOfAllCourses = courseRepository.findAll();
		List<CourseDto> listOfCourseDto = new ArrayList<>();
		for(Courses i : listOfAllCourses) {
			listOfCourseDto.add(ModleMapper.mapToCourseDto(i));
		}
		return listOfCourseDto;
	}

	@Override
	public String publishCourse(Integer id) {
		Courses course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course With Id not Found"));
		course.setPublished(true);
		courseRepository.save(course);
		return "Course is Published with id : "+course.getCourseId();
	}

	@Override
	public String deleteCourse(Integer id) {
		Courses course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course With Id not Found"));
		courseRepository.delete(course);
		return "Course Delete with Id : "+course.getCourseId();
	}

	@Override
	public CourseDto getCourse(Integer id) {
		Courses course = courseRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Course with Id not Found"));
		return ModleMapper.mapToCourseDto(course);
	}
	
	public List<AnaylsisDto> getData(){
		return courseRepository.getCourseStatistics();
	}

}
