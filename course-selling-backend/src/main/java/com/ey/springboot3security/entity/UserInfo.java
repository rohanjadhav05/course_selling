package com.ey.springboot3security.entity;

import java.util.List;
import java.util.Set;

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
@ToString(exclude = "courseUserList")
public class UserInfo { 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Integer id; 
	
	@Column(name = "user_name", unique = true, nullable = false)
	private String name; 
	
	@Column(name = "user_email", unique = true, nullable = false)
	private String email; 
	
	@Column(name = "user_pass")
	private String password; 
	
	@Column(name = "user_role")
	private String roles;
	
	@OneToMany(mappedBy = "mappedUserId", cascade = CascadeType.ALL)
	private List<CourseUser> courseUserList;
	
	public UserInfo(int mappedUserId) {
		this.id = mappedUserId;
	}
	
} 
