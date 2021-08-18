//package com.sony.assignment.controllers;
//
//import java.lang.management.ManagementFactory;
//import java.lang.management.RuntimeMXBean;
//
//import org.springframework.boot.actuate.health.Health;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//
//@RestController
//@RequestMapping("health")
//public class HealthController {
//	
//	@GetMapping()
//	public Object get() {
//		return checkDownstreamServiceHealth();
//	}
//	
//	private Health checkDownstreamServiceHealth(){
//		RuntimeMXBean runtimeBean = ManagementFactory.getRuntimeMXBean();
//        long startTime = runtimeBean.getStartTime();
//		return new Health.Builder()
//				.withDetail("startTime", startTime)
//				.up()
//				.build();
//	}
//}
