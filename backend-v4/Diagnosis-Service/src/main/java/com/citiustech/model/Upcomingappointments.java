package com.citiustech.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Upcomingappointments {

	@Id
	int meeting_id;
	String description;
	int phy_id;
	String dateofappointment;
	String timeofappontment;
	String reason;
	String history;
	String status;
	int patient_id;

	public int getMeeting_id() {
		return meeting_id;
	}

	public void setMeeting_id(int meeting_id) {
		this.meeting_id = meeting_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getPhy_id() {
		return phy_id;
	}

	public void setPhy_id(int phy_id) {
		this.phy_id = phy_id;
	}

	public String getDateofappointment() {
		return dateofappointment;
	}

	public void setDateofappointment(String dateofappointment) {
		this.dateofappointment = dateofappointment;
	}

	public String getTimeofappontment() {
		return timeofappontment;
	}

	public void setTimeofappontment(String timeofappontment) {
		this.timeofappontment = timeofappontment;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getHistory() {
		return history;
	}

	public void setHistory(String history) {
		this.history = history;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getPatient_id() {
		return patient_id;
	}

	public void setPatient_id(int patient_id) {
		this.patient_id = patient_id;
	}

	public Upcomingappointments(int meeting_id, String description, int phy_id, String dateofappointment,
			String timeofappontment, String reason, String history, String status, int patient_id) {
		super();
		this.meeting_id = meeting_id;
		this.description = description;
		this.phy_id = phy_id;
		this.dateofappointment = dateofappointment;
		this.timeofappontment = timeofappontment;
		this.reason = reason;
		this.history = history;
		this.status = status;
		this.patient_id = patient_id;
	}

	public Upcomingappointments() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Upcomingappointments [meeting_id=" + meeting_id + ", description=" + description + ", phy_id=" + phy_id
				+ ", dateofappointment=" + dateofappointment + ", timeofappontment=" + timeofappontment + ", reason="
				+ reason + ", history=" + history + ", status=" + status + ", patient_id=" + patient_id + "]";
	}

}