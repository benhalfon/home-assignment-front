package com.sony.assignment.config.security;

import org.springframework.security.crypto.password.PasswordEncoder;

public interface PasswordConfig {
	PasswordEncoder encoder();
	String encodePassword(String input);
}
