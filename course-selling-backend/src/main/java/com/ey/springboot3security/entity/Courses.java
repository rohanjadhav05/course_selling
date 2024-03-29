package com.ey.springboot3security.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "tbl_course")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude =  "courseUserList" )
public class Courses {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "course_id")
	private Integer courseId;
	
	@Column(name = "course_name", nullable = false)
	private String courseName;
	
	@Column(name = "course_desc")
	private String courseDesc;
	
	@Column(name = "course_price")
	private Integer coursePrice;
	
	@Column(name = "course_isPublished")
	private boolean isPublished;
	
	@Column(name = "course_image", length = 1024)
	private String courseImage;
	
	@OneToMany(mappedBy = "mappedCourseId",cascade = CascadeType.ALL)
	private List<CourseUser> courseUserList; 
	
	
	public Courses(int mappedCourseId) {
		this.courseId = mappedCourseId;
	}
	
}
