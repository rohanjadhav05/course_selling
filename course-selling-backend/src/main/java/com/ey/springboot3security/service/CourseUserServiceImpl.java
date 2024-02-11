package com.ey.springboot3security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ey.springboot3security.dto.CourseResponseDto;
import com.ey.springboot3security.dto.CourseUserDto;
import com.ey.springboot3security.entity.CourseUser;
import com.ey.springboot3security.entity.Courses;
import com.ey.springboot3security.mapper.ModleMapper;
import com.ey.springboot3security.repository.CourseUserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CourseUserServiceImpl implements CourseUserService{

	@Autowired
	private CourseUserRepository courseUserRepo;
	
	@Override
	public CourseUserDto purchaseCourseByUser(CourseUserDto courseUserDto) {
		CourseUser courseUser = ModleMapper.mapToCourseUser(courseUserDto);
		CourseUser savedcourseUser = courseUserRepo.save(courseUser);
		return ModleMapper.mapToCourseUserDto(savedcourseUser);
	}
	
	public List<CourseResponseDto> getPurchasedCourse(Integer userId){
		 List<CourseResponseDto> res= courseUserRepo.findCoursesByUserId(userId);
		 System.out.println(res.toString());
		 return res;
	}
}
