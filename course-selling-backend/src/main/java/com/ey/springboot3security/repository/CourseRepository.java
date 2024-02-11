package com.ey.springboot3security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ey.springboot3security.entity.Courses;

public interface CourseRepository extends JpaRepository<Courses, Integer>{

	@Query("SELECT c from Courses c WHERE c.isPublished = true")
	List<Courses> getPublishedCourse();
}
