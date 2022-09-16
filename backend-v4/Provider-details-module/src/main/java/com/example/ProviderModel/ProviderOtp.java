package com.example.ProviderModel;


	import java.time.LocalDateTime;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;

	@Entity
	public class ProviderOtp {

	 @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int otp_id;
	@Column
	String email;
	@Column
	String otp;
	@Column
	String status;
	@Column
	LocalDateTime validity;


	 public ProviderOtp() {
	super();
	// TODO Auto-generated constructor stub
	}

	 @Override
	public String toString() {
	return "ProviderOtp [otp_id=" + otp_id + ", email=" + email + ", otp=" + otp + ", status=" + status
	+ ", validity=" + validity + "]";
	}

	 public int getOtp_id() {
	return otp_id;
	}

	 public void setOtp_id(int otp_id) {
	this.otp_id = otp_id;
	}

	 public String getEmail() {
	return email;
	}

	 public void setEmail(String email) {
	this.email = email;
	}

	 public String getOtp() {
	return otp;
	}

	 public void setOtp(String otp) {
	this.otp = otp;
	}

	 public String getStatus() {
	return status;
	}

	 public void setStatus(String status) {
	this.status = status;
	}

	 public LocalDateTime getValidity() {
	return validity;
	}

	 public void setValidity(LocalDateTime validity) {
	this.validity = validity;
	}

	
}
