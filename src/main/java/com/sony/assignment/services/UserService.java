package com.sony.assignment.services;

import com.sony.assignment.boundaries.CreateUserBoundary;
import com.sony.assignment.boundaries.UpdateUserBoundary;
import com.sony.assignment.entities.UserEntity;

public interface UserService {

	UserEntity getUser(long id);

	UserEntity[] getAll();

	void deleteUser(long id);

	UserEntity addUser(CreateUserBoundary request);

	UserEntity updateUser(long id, UpdateUserBoundary request);

}