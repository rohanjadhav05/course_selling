package com.ey.springboot3security.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity; 
import jakarta.persistence.GeneratedValue; 
import jakarta.persistence.GenerationType; 
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor; 
import lombok.Data; 
import lombok.NoArgsConstructor;
import lombok.ToString; 

@Entity
@Table(name = "tbl_users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = { "courseId"})
public class UserInfo { 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int id; 
	
	@Column(name = "user_name")
	private String name; 
	@Column(name = "user_email", unique = true, nullable = false)
	private String email; 
	@Column(name = "user_pass")
	private String password; 
	@Column(name = "user_role")
	private String roles;
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "course_user_id", referencedColumnName = "user_id")
	private List<Courses> courseId;
} 
