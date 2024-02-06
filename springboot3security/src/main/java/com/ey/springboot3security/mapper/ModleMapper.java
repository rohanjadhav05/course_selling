package com.ey.springboot3security.mapper;


import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.dto.CourseUserDto;
import com.ey.springboot3security.dto.UserDto;
import com.ey.springboot3security.entity.CourseUser;
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
		UserInfo userInfo = new UserInfo();
			userInfo.setId(userDto.getId());
			userInfo.setName(userDto.getName());
			userInfo.setEmail(userDto.getEmail());
			userInfo.setPassword(userDto.getPassword());
			userInfo.setRoles(userDto.getRoles());
		return userInfo;
		
	}
	
	public static Courses mapToCourse(CourseDto courseDto) {
		Courses course =  new Courses();
		course.setPublished(courseDto.isPublished());
		course.setCourseId(courseDto.getCourseId());
		course.setCourseDesc(courseDto.getCourseDesc());
		course.setCourseName(courseDto.getCourseName());
		course.setCoursePrice(courseDto.getCoursePrice());
		return course;
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
	
	public static CourseUser mapToCourseUser(CourseUserDto courseUserdto) {
		CourseUser courseUser = new CourseUser();
		courseUser.setCourseUserId(courseUserdto.getCourseUserId());
		courseUser.setMappedUserId(new UserInfo(courseUserdto.getMappedUserId()));
		courseUser.setMappedCourseId(new Courses(courseUserdto.getMappedCourseId()));
		return courseUser;
	}
	
	public static CourseUserDto mapToCourseUserDto(CourseUser courseUser) {
		CourseUserDto courseUserDto = new CourseUserDto();
		courseUserDto.setCourseUserId(courseUser.getCourseUserId());
		courseUserDto.setMappedUserId(courseUser.getMappedUserId().getId());
		courseUserDto.setMappedCourseId(courseUser.getMappedCourseId().getCourseId());
		return courseUserDto;
	}
}
