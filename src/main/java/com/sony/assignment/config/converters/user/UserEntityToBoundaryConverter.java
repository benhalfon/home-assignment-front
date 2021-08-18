package com.sony.assignment.config.converters.user;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import com.sony.assignment.boundaries.UserBoundary;
import com.sony.assignment.entities.UserEntity;

@Component
public class UserEntityToBoundaryConverter 
implements Converter<UserEntity, UserBoundary> {

	@Override
	public UserBoundary convert(UserEntity source) {
		UserBoundary target = new UserBoundary();
		target.setAddress(source.getAddress());
		target.setEmail(source.getEmail());
		target.setFirstName(source.getFirstName());
		target.setLastName(source.getLastName());
		target.setId(source.getId());
		target.setBirthDate(source.getBirthDate());
		target.setPassword(source.getPassword());
		return target;
	}

}
