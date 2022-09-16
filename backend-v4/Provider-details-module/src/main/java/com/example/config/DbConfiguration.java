package com.example.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@ConfigurationProperties("spring.datasource")
public class DbConfiguration {
	
	private String driverClassName;
	private String url;
	private String username;
	private String password;
	public String getDriverClassName() {
		return driverClassName;
	}
	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Profile("dev")
	@Bean
	public String devConn() {
		System.out.println("DB connection for Dev profile");
		System.out.println(driverClassName);
		System.out.println(url);
		return "Dev connection established";
	}
	
	@Profile("test")
	@Bean
	public String testConn() {
		System.out.println("DB connection for Test profile");
		System.out.println(driverClassName);
		System.out.println(url);
		return "Test connection established";
		
	}
	
	@Profile("prod")
	@Bean
	public String prodConn() {
		System.out.println("DB connection for prod profile");
		System.out.println(driverClassName);
		System.out.println(url);
		return "Production connection established";
	}

}
