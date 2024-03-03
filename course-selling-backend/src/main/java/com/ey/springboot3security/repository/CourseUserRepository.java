package com.ey.springboot3security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.ey.springboot3security.dto.CourseResponseDto;
import com.ey.springboot3security.entity.CourseUser;
import com.ey.springboot3security.entity.Courses;
import com.ey.springboot3security.entity.UserInfo;

@Repository
public interface CourseUserRepository extends JpaRepository<CourseUser, Integer>{

	@Query("SELECT new com.ey.springboot3security.dto.CourseResponseDto( cu.mappedCourseId.courseId, cu.mappedCourseId.courseName, cu.mappedCourseId.courseDesc, cu.mappedCourseId.coursePrice ) FROM CourseUser cu WHERE cu.mappedUserId.id = :userId")
    List<CourseResponseDto> findCoursesByUserId(@Param("userId") Integer userId);
}
