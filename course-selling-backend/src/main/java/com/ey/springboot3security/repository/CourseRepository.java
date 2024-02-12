package com.ey.springboot3security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.entity.Courses;

public interface CourseRepository extends JpaRepository<Courses, Integer>{

	List<Courses> findByisPublished(boolean published);
	
	List<Courses> findAll();
}
