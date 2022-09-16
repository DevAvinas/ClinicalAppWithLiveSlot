package com.citiustech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Procedure {
	@Id
	@GeneratedValue
	private int Id;
	@Column
	private String procedureCode;
	@Column
	private String procedureDescription;
	@Column
	private String procedureIsDepricated;

	public Procedure() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Procedure(int id, String procedureCode, String procedureDescription, String procedureIsDepricated) {
		super();
		Id = id;
		this.procedureCode = procedureCode;
		this.procedureDescription = procedureDescription;
		this.procedureIsDepricated = procedureIsDepricated;
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

}
