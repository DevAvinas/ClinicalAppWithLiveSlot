package com.citiustech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.DTO.InvalidLoginAttemptCounter;

@Repository
public interface LoginAttemptRepository extends JpaRepository<InvalidLoginAttemptCounter, String>{

	InvalidLoginAttemptCounter[] findByEmail(String email);
}
