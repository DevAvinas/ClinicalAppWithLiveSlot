package com.example.PatientModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class PatientDemographicDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int patient_details_id ;

	@Column
	String dob ;
	@Column
	String age ;
	@Column
	String gender ;
	@Column
	String dialcode;
	@Column
	String contact ;
	@Column
	String ethnicity;
	@Column
	String language ;
	@Column
	String allergyId ;
	@Column
	boolean fatal;
	@JsonBackReference
    @OneToOne()
    @JoinColumn(name = "patient_id",referencedColumnName = "patient_id")
    PatientRegistrationDetails patientRegistrationDetails ;
    
//    @OneToOne()
//    @JoinColumn(name = "addressId",referencedColumnName = "addressId")
//    Address address ;
    
    
    
	public PatientDemographicDetails() {
		super();
	}
	public int getPatient_details_id() {
		return patient_details_id;
	}
	public void setPatient_details_id(int patient_details_id) {
		this.patient_details_id = patient_details_id;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getDialcode() {
		return dialcode;
	}
	public void setDialCode(String dialcode) {
		this.dialcode = dialcode;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getEthnicity() {
		return ethnicity;
	}
	public void setEthnicity(String ethnicity) {
		this.ethnicity = ethnicity;
	}
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	public String getAllergyId() {
		return allergyId;
	}
	public void setAllergyId(String allergyId) {
		this.allergyId = allergyId;
	}
	public boolean isFatal() {
		return fatal;
	}
	public void setFatal(boolean fatal) {
		this.fatal = fatal;
	}
	public PatientRegistrationDetails getPatientRegistrationDetails() {
		return patientRegistrationDetails;
	}
	public void setPatientRegistrationDetails(PatientRegistrationDetails patientRegistrationDetails) {
		this.patientRegistrationDetails = patientRegistrationDetails;
	}
	@Override
	public String toString() {
		return "PatientDemographicDetails [patient_details_id=" + patient_details_id + ", dob=" + dob + ", age=" + age
				+ ", gender=" + gender + ", dialcode=" + dialcode + ", contact=" + contact + ", ethnicity=" + ethnicity
				+ ", language=" + language + ", allergyId=" + allergyId + ", fatal=" + fatal
				+ ", patientRegistrationDetails=" + patientRegistrationDetails + "]";
	}

	


	

}
