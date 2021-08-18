package com.sony.assignment.config.exceptions;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class PasswordPolicyError extends RuntimeException {

	private static final long serialVersionUID = 6172352123988325358L;
	
	public PasswordPolicyError(List<String> messages) {
		super(String.format("Password policy error:%s",
				String.join(",", messages)));
	}

}
