package com.example.PatientModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int addressId;
	
	@Column
	String line1;
	@Column
    String line2;
	@Column
    String postalcode;
	@Column
    String city;
	@Column
    String state;
	@Column
    String country;
	@Column
	String address_type;
	@JsonBackReference
    @ManyToOne()
    @JoinColumn(name = "patient_id",foreignKey=@ForeignKey(name = "Fk_addr_reg_key"))
    PatientRegistrationDetails patientRegistrationDetails ;

    
    

	public int getAddressId() {
		return addressId;
	}
	public void setAddressId(int addressId) {
		this.addressId = addressId;
	}
    
	public String getLine1() {
		return line1;
	}
	public void setLine1(String line1) {
		this.line1 = line1;
	}
	public String getLine2() {
		return line2;
	}
	public void setLine2(String line2) {
		this.line2 = line2;
	}
	public String getPostalcode() {
		return postalcode;
	}
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getAddress_type() {
		return address_type;
	}
	public void setAddress_type(String address_type) {
		this.address_type = address_type;
	}
	public PatientRegistrationDetails getPatientRegistrationDetails() {
		return patientRegistrationDetails;
	}
	public void setPatientRegistrationDetails(PatientRegistrationDetails patientRegistrationDetails) {
		this.patientRegistrationDetails = patientRegistrationDetails;
	}

}
