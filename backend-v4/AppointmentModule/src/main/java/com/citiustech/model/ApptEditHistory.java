package com.citiustech.model;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ApptEditHistory {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
String history_id;

@Column
int meetId;
@Column
String description;
@Column
String phyId;
@Column
Date apptDt;
@Column
LocalTime apptFrTime;
@Column
LocalTime apptToTime;
@Column
String reason;
@Column
String status;
@Column
String patientId;
@Column
String changedbyId;
@Column
LocalDateTime ModifiedTs= LocalDateTime.now();
@Column
String patientname;
@Column
String phyname;
public ApptEditHistory() {
	super();
	// TODO Auto-generated constructor stub
}
public String getHistory_id() {
	return history_id;
}
public void setHistory_id(String history_id) {
	this.history_id = history_id;
}
public int getMeetId() {
	return meetId;
}
public void setMeetId(int meetId) {
	this.meetId = meetId;
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
public String getChangedbyId() {
	return changedbyId;
}
public void setChangedbyId(String changedbyId) {
	this.changedbyId = changedbyId;
}
public LocalDateTime getModifiedTs() {
	return ModifiedTs;
}
public void setModifiedTs(LocalDateTime modifiedTs) {
	ModifiedTs = modifiedTs;
}
public String getPatientname() {
	return patientname;
}
public void setPatientname(String patientname) {
	this.patientname = patientname;
}
public String getPhyname() {
	return phyname;
}
public void setPhyname(String phyname) {
	this.phyname = phyname;
}


}
