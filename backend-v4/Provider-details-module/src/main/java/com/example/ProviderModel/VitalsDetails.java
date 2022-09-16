package com.example.ProviderModel;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity(name="vitalsdetails")
public class VitalsDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int vitals_details_id;
	@Column
	int meetingid;
	@Column
	String first_name;
	@Column
	String physician;
	@Column
	int height;
	@Column
	float weight;
	@Column
	String bloodpressure;
	@Column
	int bodytemperature;
	@Column
	int respirationrate;
	
	
	public int getVitals_details_id() {
		return vitals_details_id;
	}
	public void setVitals_details_id(int vitals_details_id) {
		this.vitals_details_id = vitals_details_id;
	}
	
	public int getMeetingid() {
		return meetingid;
	}
	public void setMeetingid(int meetingid) {
		this.meetingid = meetingid;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getPhysician() {
		return physician;
	}
	public void setPhysician(String physician) {
		this.physician = physician;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	
	
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public String getBloodpressure() {
		return bloodpressure;
	}
	public void setBloodpressure(String bloodpressure) {
		this.bloodpressure = bloodpressure;
	}
	public int getBodytemperature() {
		return bodytemperature;
	}
	public void setBodytemperature(int bodytemperature) {
		this.bodytemperature = bodytemperature;
	}
	public int getRespirationrate() {
		return respirationrate;
	}
	public void setRespirationrate(int respirationrate) {
		this.respirationrate = respirationrate;
	}
	
	public VitalsDetails(int vitals_details_id, int meetingid, String first_name, String physician, int height,
			float weight, String bloodpressure, int bodytemperature, int respirationrate) {
		super();
		this.vitals_details_id = vitals_details_id;
		this.meetingid = meetingid;
		this.first_name = first_name;
		this.physician = physician;
		this.height = height;
		this.weight = weight;
		this.bloodpressure = bloodpressure;
		this.bodytemperature = bodytemperature;
		this.respirationrate = respirationrate;
	}
	public VitalsDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "VitalsDetails [vitals_details_id=" + vitals_details_id + ", meetingid=" + meetingid + ", first_name="
				+ first_name + ", physician=" + physician + ", height=" + height + ", weight=" + weight
				+ ", bloodpressure=" + bloodpressure + ", bodytemperature=" + bodytemperature + ", respirationrate="
				+ respirationrate + "]";
	}
	
	
	
	
	
//	@OneToOne()
//	@JoinColumn(name="emp_id",foreignKey=@ForeignKey(name = "Fk_emer_reg_key"))
//ProviderRegistration provideregistration ;
//	
//	@OneToOne()
//	@JoinColumn(name="meeting_id",foreignKey=@ForeignKey(name = "Fk_emer_reg_key"))
//PatientAppointment patientappointment ;
//	
//	
//	@OneToOne()
//	@JoinColumn(name="patient_id",foreignKey=@ForeignKey(name = "Fk_emer_reg_key"))
//	PatientRegistrationDetails patientregistration;
//	
	
	
	
}
