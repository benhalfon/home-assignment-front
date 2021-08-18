package com.sony.assignment.config.health;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.util.Date;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

@Component
public class TimeHealthIndicator implements HealthIndicator {

	@Override
	public Health health() {
		RuntimeMXBean runtimeBean = ManagementFactory.getRuntimeMXBean();
		long startTime = runtimeBean.getStartTime();
		return new Health.Builder()
				.withDetail("startTime", startTime)
				.withDetail("startDate", new Date(startTime))
				.up()
				.build();


	}
}