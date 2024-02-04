package com.ey.springboot3security.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_course")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Courses {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "course_id")
	private int courseId;
	@Column(name = "course_name", nullable = false)
	private String courseName;
	@Column(name = "course_desc")
	private String courseDesc;
	@Column(name = "course_price")
	private int coursePrice;
	
	
}
