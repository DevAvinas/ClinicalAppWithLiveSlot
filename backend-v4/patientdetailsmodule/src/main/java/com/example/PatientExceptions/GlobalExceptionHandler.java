package com.example.PatientExceptions;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	 

	
	@ExceptionHandler(value=PatientAlredyExistsException.class)
	public ResponseEntity<?> customerAlreadyExist(PatientAlredyExistsException exception, WebRequest request) {
		ErrorLog log = new ErrorLog(new Date(), exception.getMessage(), request.getDescription(false));
		return new ResponseEntity<>(log, HttpStatus.CONFLICT);
	}
	
//	@ExceptionHandler(value=PatientAlredyExistsException.class)
//	public ResponseEntity<?> customerEmailAlreadyExist(PatientAlredyExistsException exception, WebRequest request) {
//		ErrorLog log = new ErrorLog(new Date(), exception.getMessage(), request.getDescription(false));
//		return new ResponseEntity<>(log, HttpStatus.CONFLICT);
//	}
	



}
