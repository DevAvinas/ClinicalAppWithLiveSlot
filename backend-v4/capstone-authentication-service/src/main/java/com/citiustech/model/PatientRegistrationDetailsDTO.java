package com.citiustech.model;

//PatientMaster
//Gateway DTO
public class PatientRegistrationDetailsDTO {

	String patient_id ;

	String email ;

	boolean active ;

	String dor;
	
	String role;
	
	public PatientRegistrationDetailsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public PatientRegistrationDetailsDTO(String patient_id, String email, boolean active, String dor) {
		super();
		this.patient_id = patient_id;
		this.email = email;
		this.active = active;
		this.dor = dor;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public String getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(String patient_id) {
		this.patient_id = patient_id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getDor() {
		return dor;
	}

	public void setDor(String dor) {
		this.dor = dor;
	}

	@Override
	public String toString() {
		return "{patient_id:" + patient_id + ", email:" + email + ", active:" + active+ ", role:" + role
				+ ", dor=" + dor + "}";
	}
	
	

}
