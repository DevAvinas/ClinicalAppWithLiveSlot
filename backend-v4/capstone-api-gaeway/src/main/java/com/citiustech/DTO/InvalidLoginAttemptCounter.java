package com.citiustech.DTO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class InvalidLoginAttemptCounter {
		
	@Id
	String email;
	
	@Column
	int attemptcount;

	public InvalidLoginAttemptCounter() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAttemptcount() {
		return attemptcount;
	}

	public void setAttemptcount(int attemptcount) {
		this.attemptcount = attemptcount;
	}
	
	
	
}
