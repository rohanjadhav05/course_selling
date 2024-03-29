package com.ey.springboot3security.service;

import com.ey.springboot3security.entity.AuthRequest;
import com.ey.springboot3security.entity.UserInfo; 
import com.ey.springboot3security.repository.UserInfoRepository; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.core.userdetails.UserDetails; 
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.stereotype.Service; 

import java.util.Optional; 

@Service
public class UserInfoService implements UserDetailsService { 

	@Autowired
	private UserInfoRepository repository; 

	@Autowired
	private PasswordEncoder encoder; 

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { 
		Optional<UserInfo> userDetail = repository.findByName(username); 
		// Converting userDetail to UserDetails 
		return userDetail.map(UserInfoDetails::new) 
				.orElseThrow(() -> new UsernameNotFoundException("User not found " + username)); 
	} 

	public UserInfo addUser(UserInfo userInfo) { 
		if(userInfo.getPassword() != null) {
			userInfo.setPassword(encoder.encode(userInfo.getPassword())); 
		}
		return repository.save(userInfo); 
	} 
	
	public String changePassword(AuthRequest authRequest){
		UserInfo userDetail = repository.findByName(authRequest.getUsername()).get();
		userDetail.setPassword(encoder.encode(authRequest.getUsername()));
		repository.save(userDetail);
		return "Password Updated Successfully";
	}
} 

