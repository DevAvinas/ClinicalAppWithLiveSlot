package com.example.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.GenericFilter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;

public class AuthenticationFilter extends GenericFilter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		HttpServletRequest httpRequest= (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		httpResponse.setHeader("Access-Control-Allow-Origin", "*");
		httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		httpResponse.setHeader("Access-Control-Max-Age", "86400");
		
		if(httpRequest.getMethod().equalsIgnoreCase(HttpMethod.OPTIONS.name())) {
	
			
			chain.doFilter(httpRequest, httpResponse);
		} else {
			String auth = httpRequest.getHeader("Authorization");
			System.out.println("Auth :"+auth);
			if((auth == null || !auth.startsWith("Bearer"))) {
				throw new ServletException("Token missing or invalid");
			}
			//Bearer dfjkfjdkjfdkjfdkjfkdjfkdjfkd
			String token = auth.substring(7);
			System.out.println("Token: "+token);
			try {
			JwtParser jwtParser = Jwts.parser().setSigningKey("login_key");
			
			Jwt tokenobj = jwtParser.parse(token);
			
			Claims claims = (Claims) tokenobj.getBody();
			System.out.println("==============================================");
			System.out.println("Welcome: " + claims.getSubject());
			} catch(SignatureException se) {
				throw new ServletException("Signature mismatch");
			} catch (MalformedJwtException me) {
				throw new ServletException("Token is modified by unauthorised user");
			} catch (ExpiredJwtException e) {
				throw new ServletException("Token is expired");
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	chain.doFilter(httpRequest, httpResponse);	
	}
	

}