package com.citiustech.controller;

import java.util.Date;

import javax.servlet.ServletException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.model.PatientRegistrationDetailsDTO;
import com.citiustech.model.ProviderRegistrationDetailsDTO;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@RestController
@RequestMapping("/api/generate")
public class JWTController {
			
	@PostMapping("/patient/token")
	public String authenticate(@RequestBody PatientRegistrationDetailsDTO obj) throws ServletException {
		System.out.println(obj.getEmail()+" Active status is:"+obj.isActive());
		if(obj.getEmail()== null || obj.isActive()==false) {
			throw new ServletException("You account is inactive.Contact Admin.");
		}
		return Jwts.builder().setSubject(obj.toString()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+18000000))
				.signWith(SignatureAlgorithm.HS256, "login_key").compact();

	}
	@PostMapping("/provider/token")
	public String authenticateProvider(@RequestBody ProviderRegistrationDetailsDTO obj) throws ServletException {
		System.out.println(obj.getEmail()+" Active status is:"+obj.isActive());
		if(obj.getEmail()== null || obj.isActive()==false) {
			throw new ServletException("You account is inactive.Contact Admin.");
		}
		return Jwts.builder().setSubject(obj.toString()).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis()+18000000))
				.signWith(SignatureAlgorithm.HS256, "login_key").compact();

	}	
	@PostMapping("/go")
	public String go() {
		return "go";
	}
	
}
