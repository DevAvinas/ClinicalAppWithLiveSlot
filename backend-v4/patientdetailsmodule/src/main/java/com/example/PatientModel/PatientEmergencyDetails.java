package com.example.PatientModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class PatientEmergencyDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int emergency_details_id;
	
	@Column
	String first_name ;
	@Column
	String last_name ;
	@Column
    String email;
	@Column
	String relationship;
	@Column
	String dialcode;
	@Column
	String phone;
	@Column 
	boolean access;
	@JsonBackReference
    @OneToOne()
    @JoinColumn(name = "patient_id", foreignKey=@ForeignKey(name = "Fk_emer_reg_key"))
    PatientRegistrationDetails patientRegistrationDetails ;
    
    
	public String getDialcode() {
		return dialcode;
	}

	public void setDialcode(String dialcode) {
		this.dialcode = dialcode;
	}

	public int getEmergency_details_id() {
		return emergency_details_id;
	}
	
	public void setEmergency_details_id(int emergency_details_id) {
		this.emergency_details_id = emergency_details_id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRelationship() {
		return relationship;
	}
	public void setRelationship(String relationship) {
		this.relationship = relationship;
	}

	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public boolean isAccess() {
		return access;
	}
	public void setAccess(boolean access) {
		this.access = access;
	}
	public PatientRegistrationDetails getPatientRegistrationDetails() {
		return patientRegistrationDetails;
	}
	public void setPatientRegistrationDetails(PatientRegistrationDetails patientRegistrationDetails) {
		this.patientRegistrationDetails = patientRegistrationDetails;
	}
    
    
	
}
