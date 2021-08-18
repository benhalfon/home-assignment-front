package com.sony.assignment.boundaries;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@Setter
@JsonInclude(value =Include.NON_NULL)
public class UpdateUserBoundary {
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	private Date birthDate;
	private String address;
}
