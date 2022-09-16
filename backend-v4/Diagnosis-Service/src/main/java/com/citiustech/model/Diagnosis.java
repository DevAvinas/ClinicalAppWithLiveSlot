package com.citiustech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Diagnosis {
	@Id
	@GeneratedValue
	private int Id;
	@Column
	private String diagnosisCode;
	@Column
	private String diagnosisDescription;
	@Column
	private String diagnosisIsDepricated;

	public Diagnosis() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public Diagnosis(String diagnosisCode, String diagnosisDescription, String diagnosisIsDepricated) {
		super();
		this.diagnosisCode = diagnosisCode;
		this.diagnosisDescription = diagnosisDescription;
		this.diagnosisIsDepricated = diagnosisIsDepricated;
	}

	public String getDiagnosisCode() {
		return diagnosisCode;
	}

	public void setDiagnosisCode(String diagnosisCode) {
		this.diagnosisCode = diagnosisCode;
	}

	public String getDiagnosisDescription() {
		return diagnosisDescription;
	}

	public void setDiagnosisDescription(String diagnosisDescription) {
		this.diagnosisDescription = diagnosisDescription;
	}

	public String getDiagnosisIsDepricated() {
		return diagnosisIsDepricated;
	}

	public void setDiagnosisIsDepricated(String diagnosisIsDepricated) {
		this.diagnosisIsDepricated = diagnosisIsDepricated;
	}

}
