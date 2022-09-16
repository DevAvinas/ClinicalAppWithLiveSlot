package com.citiustech.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class PrescribedMedication {
	@Id
	@GeneratedValue
	int id;
	@Column
	private String drug_id ;
	@Column
	int meetingid;
	
	
	@Column
	private String drug_name;
	@Column
	private String drug_generic_name;
	
	//@ElementCollection
	@Column
	@Convert(converter = StringToListConverter.class)
	private List<String> drug_brand_name;
	@Column
	private String drug_form;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDrug_id() {
		return drug_id;
	}
	public void setDrug_id(String drug_id) {
		this.drug_id = drug_id;
	}
	public int getMeetingid() {
		return meetingid;
	}
	public void setMeetingid(int meetingid) {
		this.meetingid = meetingid;
	}
	
	public String getDrug_name() {
		return drug_name;
	}
	public void setDrug_name(String drug_name) {
		this.drug_name = drug_name;
	}
	public String getDrug_generic_name() {
		return drug_generic_name;
	}
	public void setDrug_generic_name(String drug_generic_name) {
		this.drug_generic_name = drug_generic_name;
	}
	

	public List<String> getDrug_brand_name() {
		return drug_brand_name;
	}
	public void setDrug_brand_name(List<String> drug_brand_name) {
		this.drug_brand_name = drug_brand_name;
	}
	public String getDrug_form() {
		return drug_form;
	}
	public void setDrug_form(String drug_form) {
		this.drug_form = drug_form;
	}
	public PrescribedMedication() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PrescribedMedication(int id, String drug_id, int meetingid, String drug_name, String drug_generic_name,
			List<String> drug_brand_name, String drug_form) {
		super();
		this.id = id;
		this.drug_id = drug_id;
		this.meetingid = meetingid;
		this.drug_name = drug_name;
		this.drug_generic_name = drug_generic_name;
		this.drug_brand_name = drug_brand_name;
		this.drug_form = drug_form;
	}
	@Override
	public String toString() {
		return "PrescribedMedication [id=" + id + ", drug_id=" + drug_id + ", meetingid=" + meetingid + ", drug_name="
				+ drug_name + ", drug_generic_name=" + drug_generic_name + ", drug_brand_name=" + drug_brand_name
				+ ", drug_form=" + drug_form + "]";
	}
	
	
	
	
}
