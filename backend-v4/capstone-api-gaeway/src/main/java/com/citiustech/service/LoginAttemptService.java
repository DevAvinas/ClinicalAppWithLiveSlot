package com.citiustech.service;

import com.citiustech.DTO.InvalidLoginAttemptCounter;

public interface LoginAttemptService {
		
	InvalidLoginAttemptCounter save(InvalidLoginAttemptCounter invalidLoginAttemptCounter);
	InvalidLoginAttemptCounter findById(String email);
	void deleteInvalidLoginCount(String email);
	
	
}
