package com.ey.springboot3security.mapper;


import com.ey.springboot3security.dto.UserDto;
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
		UserInfo user = new UserInfo();
		user.setId(user.getId());
		user.setName(userDto.getName());
		user.setEmail(userDto.getName());
		user.setPassword(userDto.getPassword());
		user.setRoles(userDto.getRoles());
		return user;
	}
	
}
