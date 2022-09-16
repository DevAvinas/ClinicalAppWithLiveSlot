package com.citiustech.model;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int meetId;
	@Column
	String meetingTitle;
	@Column
	String description;
	@Column
	String phyId;
	@Column
	String phyname;
	@Column
	Date apptDt;
	@Column
	LocalTime apptFrTime;
	@Column
	LocalTime apptToTime;
	@Column
	String apptType;
	@Column
	String reason;
	
//	EditHistory historyId; --need to be implemented
	
	@Column
	String status;
	@Column
	String patientId;
	@Column
	String patientname;
	@Column
	String changedbyId;
	@Column
	LocalDateTime creationDt= LocalDateTime.now();
	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getMeetId() {
		return meetId;
	}

	public void setMeetId(int meetId) {
		this.meetId = meetId;
	}

	public String getMeetingTitle() {
		return meetingTitle;
	}
	public void setMeetingTitle(String meetingTitle) {
		this.meetingTitle = meetingTitle;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPhyId() {
		return phyId;
	}
	public void setPhyId(String phyId) {
		this.phyId = phyId;
	}
	public String getPhyname() {
		return phyname;
	}
	public void setPhyname(String phyname) {
		this.phyname = phyname;
	}
	public Date getApptDt() {
		return apptDt;
	}
	public void setApptDt(Date apptDt) {
		this.apptDt = apptDt;
	}
	public LocalTime getApptFrTime() {
		return apptFrTime;
	}
	public void setApptFrTime(LocalTime apptFrTime) {
		this.apptFrTime = apptFrTime;
	}
	public LocalTime getApptToTime() {
		return apptToTime;
	}
	public void setApptToTime(LocalTime apptToTime) {
		this.apptToTime = apptToTime;
	}
	public String getApptType() {
		return apptType;
	}
	public void setApptType(String apptType) {
		this.apptType = apptType;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public String getChangedbyId() {
		return changedbyId;
	}
	public void setChangedbyId(String changedbyId) {
		this.changedbyId = changedbyId;
	}
	public LocalDateTime getCreationDt() {
		return creationDt;
	}
	public void setCreationDt(LocalDateTime creationDt) {
		this.creationDt = creationDt;
	}
	
	

	
	
}
