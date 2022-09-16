package com.citiustech.model;

//PatientMaster
//Gateway DTO
public class ProviderRegistrationDetailsDTO {

	String provider_id ;

	String email ;

	boolean active ;

	String dor;
	
	String role;


	public ProviderRegistrationDetailsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	

	public ProviderRegistrationDetailsDTO(String provider_id, String email, boolean active, String dor) {
		super();
		this.provider_id = provider_id;
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


	public String getProvider_id() {
		return provider_id;
	}

	public void setProvider_id(String provider_id) {
		this.provider_id = provider_id;
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
		return "provider_id=" + provider_id + ", email=" + email + ", active=" + active+ ", role=" + role
				;
	}


	
	

}
