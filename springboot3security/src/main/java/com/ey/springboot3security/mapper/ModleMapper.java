package com.ey.springboot3security.mapper;


import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.dto.UserDto;
import com.ey.springboot3security.entity.Courses;
import com.ey.springboot3security.entity.UserInfo;

public class ModleMapper {
	
	public static UserDto mapToUserDto(UserInfo user) {
		return new UserDto(
				user.getId(),
				user.getName(),
				user.getEmail(),
				user.getPassword(),
				user.getRoles()
		);
	}
	
	public static UserInfo maptoUser(UserDto userDto) {
		return new UserInfo(
				userDto.getId(),
				userDto.getName(),
				userDto.getEmail(),
				userDto.getPassword(),
				userDto.getRoles()
		);
		
	}
	
	public static Courses mapToCourse(CourseDto courseDto) {
		return new Courses(
				courseDto.getCourseId(),
				courseDto.getCourseName(),
				courseDto.getCourseDesc(),
				courseDto.getCoursePrice(),
				courseDto.isPublished()
		);
	}
	
	public static CourseDto mapToCourseDto(Courses course) {
		return new CourseDto(
					course.getCourseId(),
					course.getCourseName(),
					course.getCourseDesc(),
					course.getCoursePrice(),
					course.isPublished()
		);
	}
}
