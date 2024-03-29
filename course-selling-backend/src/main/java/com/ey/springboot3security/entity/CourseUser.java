package com.ey.springboot3security.entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "tbl_course_user", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"mapped_user_id", "mapped_course_id"})
     })
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = { "mappedUserId", "mappedCourseId" })
public class CourseUser {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_user_id")
    private Integer courseUserId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mapped_user_id", nullable = false)
    private UserInfo mappedUserId;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mapped_course_id", nullable = false)
    private Courses mappedCourseId;
}
