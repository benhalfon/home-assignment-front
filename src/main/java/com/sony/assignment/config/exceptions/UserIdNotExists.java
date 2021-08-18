package com.sony.assignment.config.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserIdNotExists extends RuntimeException {

	private static final long serialVersionUID = 6477354923988884378L;
	
	public UserIdNotExists(long id) {
		super(String.format("User id: %d not found",id));
	}
}
