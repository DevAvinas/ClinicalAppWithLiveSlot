package com.citiustech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name="prescribedprocedure")
public class PrescribedProcedure {
	@Id
	@GeneratedValue
	private int Id;
	@Column
	private String procedureCode;
	@Column
	private String procedureDescription;
	@Column
	private String procedureIsDepricated;
	@Column
	int meeting_id;

	public PrescribedProcedure() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getProcedureCode() {
		return procedureCode;
	}

	public void setProcedureCode(String procedureCode) {
		this.procedureCode = procedureCode;
	}

	public String getProcedureDescription() {
		return procedureDescription;
	}

	public void setProcedureDescription(String procedureDescription) {
		this.procedureDescription = procedureDescription;
	}

	public String getProcedureIsDepricated() {
		return procedureIsDepricated;
	}

	public void setProcedureIsDepricated(String procedureIsDepricated) {
		this.procedureIsDepricated = procedureIsDepricated;
	}

	public int getMeeting_id() {
		return meeting_id;
	}

	public void setMeeting_id(int meeting_id) {
		this.meeting_id = meeting_id;
	}

	

}
