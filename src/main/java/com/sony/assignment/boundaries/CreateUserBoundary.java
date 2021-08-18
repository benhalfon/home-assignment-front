package com.sony.assignment.boundaries;

import java.util.Date;


import lombok.*;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
public class CreateUserBoundary {

	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String address;
}
