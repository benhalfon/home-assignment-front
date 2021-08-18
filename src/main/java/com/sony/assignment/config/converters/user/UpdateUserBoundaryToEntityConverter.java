package com.sony.assignment.config.converters.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.sony.assignment.boundaries.UpdateUserBoundary;
import com.sony.assignment.config.security.PasswordConfig;
import com.sony.assignment.entities.UserEntity;

@Component
public class UpdateUserBoundaryToEntityConverter 
implements Converter<UpdateUserBoundary, UserEntity> {

	@Autowired
	private PasswordConfig securityConfig;
	
	@Override
	public UserEntity convert(UpdateUserBoundary source) {
		UserEntity target = new UserEntity();
		target.setAddress(source.getAddress());
		target.setEmail(source.getEmail());
		target.setFirstName(source.getFirstName());
		target.setLastName(source.getLastName());
		target.setBirthDate(source.getBirthDate());
		if(source.getPassword() != null)
			target.setPassword(securityConfig.encodePassword(source.getPassword()));
		return target;
	}

}
