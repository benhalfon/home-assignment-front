package com.sony.assignment.config.converters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.sony.assignment.boundaries.CreateUserBoundary;
import com.sony.assignment.boundaries.UserBoundary;
import com.sony.assignment.entities.UserEntity;

@Configuration
public class ConvertersConfig implements WebMvcConfigurer {
	
	@Autowired
	private Converter<CreateUserBoundary, UserEntity> createUserBoundaryToUserEntity;
	@Autowired
	private Converter<UserEntity, UserBoundary> userEntityToUserBoundary;
	
	
	@Override
    public void addFormatters(FormatterRegistry registry) {
		registry.addConverter(createUserBoundaryToUserEntity);
		registry.addConverter(userEntityToUserBoundary);
	}
}
