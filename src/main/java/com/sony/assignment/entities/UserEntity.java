package com.sony.assignment.entities;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name="users")
public class UserEntity {

	@Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
	private long id;
	private String email;
	private String password;
	private String firstName;
	private String lastName;
	@Basic
	@Temporal(TemporalType.DATE)
	private Date birthDate;
	private String address;
	
	public void update(UserEntity other) {
		if(other.email!= null)
			this.email = other.email;
		if(other.birthDate != null)
			this.birthDate = other.birthDate;
		if(other.address != null)
			this.address = other.address;
		if(other.firstName != null)
			this.firstName = other.firstName;
		if(other.lastName != null)
			this.lastName = other.lastName;
		if(other.password != null)
			this.password = other.password;
	}
	
	
}
