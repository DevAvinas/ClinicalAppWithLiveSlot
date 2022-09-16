package com.example.PatientModel;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;
//PatientMaster
@Entity
public class PatientRegistrationDetails {
	@Id
	@GenericGenerator(name="seq_id", strategy = "com.example.PatientUtility.PatientIdGenerator")
	@GeneratedValue(generator = "seq_id")
	String patient_id ;
	@Column
	String title ;
	@Column
	String firstname ;
	@Column
	String lastname ;
	@Column
	 String email ;
	@Column
	String password ;
	@Column
	String dob;
	@Column
	String role="patient";
	@Column
	boolean active =true;
	
	@Column
	String dor =new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL,
            mappedBy = "patientRegistrationDetails")
	PatientDemographicDetails patientDemographicDetails;
    @OneToMany(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL,
            mappedBy = "patientRegistrationDetails")
	List<Address> address;
    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL,
            mappedBy = "patientRegistrationDetails")
	PatientEmergencyDetails patientEmergencyDetails;

	public PatientRegistrationDetails() {
		super();
		// TODO Auto-generated constructor stub
	}



	public List<Address> getAddress() {
		return address;
	}



	public void setAddress(List<Address> address) {
		this.address = address;
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String first_name) {
		this.firstname = first_name;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String last_name) {
		this.lastname = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
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

	public PatientDemographicDetails getPatientDemographicDetails() {
		return patientDemographicDetails;
	}

	public void setPatientDemographicDetails(PatientDemographicDetails patientDemographicDetails) {
		this.patientDemographicDetails = patientDemographicDetails;
	}



	public PatientEmergencyDetails getPatientEmergencyDetails() {
		return patientEmergencyDetails;
	}

	public void setPatientEmergencyDetails(PatientEmergencyDetails patientEmergencyDetails) {
		this.patientEmergencyDetails = patientEmergencyDetails;
	}

	@Override
	public String toString() {
		return "PatientRegistrationDetails [patient_id=" + patient_id + ", title=" + title + ", firstname=" + firstname
				+ ", lastname=" + lastname + ", email=" + email + ", password=" + password + ", dob=" + dob + ", active=" + active + ", dor=" + dor + ", patientDemographicDetails="
				+ patientDemographicDetails + ", address=" + address + ", patientEmergencyDetails="
				+ patientEmergencyDetails + "]";
	}

	

	

}
