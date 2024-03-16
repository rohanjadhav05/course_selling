package com.ey.springboot3security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ey.springboot3security.dto.AnaylsisDto;
import com.ey.springboot3security.dto.CourseDto;
import com.ey.springboot3security.entity.Courses;

@Repository
public interface CourseRepository extends JpaRepository<Courses, Integer>{

	List<Courses> findByisPublished(boolean published);
	
	List<Courses> findAll();
	
	@Query("SELECT new com.ey.springboot3security.dto.AnaylsisDto(c.courseName, " +
            "COUNT(cu.mappedCourseId.courseId), " +
            "SUM(c.coursePrice) AS totalAmount ) " +
            "FROM Courses c " +
            "JOIN CourseUser cu ON cu.mappedCourseId.courseId = c.courseId " +
            "JOIN UserInfo u ON u.id = cu.mappedUserId.id " +
            "GROUP BY c.courseId")
	List<AnaylsisDto> getCourseStatistics();
}
