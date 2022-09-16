package com.citiustech;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.citiustech.filter.AuthenticationFilter;


@EnableEurekaClient
@SpringBootApplication
public class DiagnosisServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiagnosisServiceApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean getFilter() {
		UrlBasedCorsConfigurationSource urlconfig = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();

		List<String> all = Arrays.asList("*");

		config.setAllowCredentials(true);
		config.setAllowedHeaders(all);
		config.setAllowedMethods(all);
		config.setAllowedOrigins(all);

		urlconfig.registerCorsConfiguration("/**", config);

		FilterRegistrationBean filterbean = new FilterRegistrationBean(new CorsFilter(urlconfig));
		filterbean.setFilter(new AuthenticationFilter());
		filterbean.addUrlPatterns("/api/private/*");

		return filterbean;
	}
}
