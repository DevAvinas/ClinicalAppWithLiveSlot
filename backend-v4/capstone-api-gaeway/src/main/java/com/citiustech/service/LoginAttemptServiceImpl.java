package com.citiustech.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.DTO.InvalidLoginAttemptCounter;
import com.citiustech.repository.LoginAttemptRepository;

@Service
public class LoginAttemptServiceImpl implements LoginAttemptService {
	@Autowired
	LoginAttemptRepository loginAttemptRepository;

	@Override
	public InvalidLoginAttemptCounter save(InvalidLoginAttemptCounter invalidLoginAttemptCounter) {
		// TODO Auto-generated method stub
		InvalidLoginAttemptCounter result;
//		InvalidLoginAttemptCounter ob = loginAttemptRepository.
//				findById(invalidLoginAttemptCounter.getEmail()).orElse(null);
//		if(ob==null) {
//			invalidLoginAttemptCounter.setAttemptcount(3);
//			result = loginAttemptRepository.save(invalidLoginAttemptCounter);
//		}
//		else {
		result = loginAttemptRepository.save(invalidLoginAttemptCounter);

//		}
		return result;
	}

	@Override
	public InvalidLoginAttemptCounter findById(String email) {
		// TODO Auto-generated method stub
		return loginAttemptRepository.findById(email).orElse(null);
	}

	@Override
	public void deleteInvalidLoginCount(String email) {
		InvalidLoginAttemptCounter[] countArr = loginAttemptRepository.findByEmail(email);
		if (countArr.length > 0) {
			if (countArr[0] != null) {
				loginAttemptRepository.delete(countArr[0]);
			}
		}
	}

}
