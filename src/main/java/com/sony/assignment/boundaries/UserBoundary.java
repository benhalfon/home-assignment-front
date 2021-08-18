package com.sony.assignment.boundaries;

import java.util.Date;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
public class UserBoundary {
	private Long id;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String address;
}
