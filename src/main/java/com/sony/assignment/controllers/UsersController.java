package com.sony.assignment.controllers;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sony.assignment.boundaries.CreateUserBoundary;
import com.sony.assignment.boundaries.UpdateUserBoundary;
import com.sony.assignment.boundaries.UserBoundary;
import com.sony.assignment.services.UserService;

@RestController
@RequestMapping("users")
public class UsersController {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private ConversionService conversionService;
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String getMessage() {
		return "Ben";
	}
	
	@GetMapping("displayAll")
	public UserBoundary[] get() {
		return Stream.of(service.getAll())
				.map(e -> this.conversionService.convert(e, UserBoundary.class))
				.toArray(UserBoundary[]::new);
	}
	
	@PostMapping()
	public UserBoundary post(@RequestBody CreateUserBoundary request) {
		return this.conversionService
				.convert(service.addUser(request),
						UserBoundary.class);
	}
	
	@DeleteMapping()
	public void delete(@RequestParam long id) {
		service.deleteUser(id);
	}
	
	@GetMapping()
	public UserBoundary get(@RequestParam long id) {
		return 
				this.conversionService
				.convert(service.getUser(id),UserBoundary.class);
	}
	
	@PutMapping()
	public UserBoundary put(@RequestParam long id,@RequestBody UpdateUserBoundary request) {
		return 
				this.conversionService
				.convert(service.updateUser(id,request),UserBoundary.class);
	}
	
	
	
}
