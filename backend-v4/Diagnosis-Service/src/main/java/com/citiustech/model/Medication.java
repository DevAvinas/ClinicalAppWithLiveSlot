package com.citiustech.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Medication {

	@Id
	private String drug_id ;
	@Column
	private String drug_name;
	@Column
	private String drug_generic_name;
	@Column
	private String drug_brand_name;
	@Column
	private String drug_form;
	
	
	public String getDrug_id() {
		return drug_id;
	}
	public void setDrug_id(String drug_id) {
		this.drug_id = drug_id;
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
	public String getDrug_brand_name() {
		return drug_brand_name;
	}
	public void setDrug_brand_name(String drug_brand_name) {
		this.drug_brand_name = drug_brand_name;
	}
	public String getDrug_form() {
		return drug_form;
	}
	public void setDrug_form(String drug_form) {
		this.drug_form = drug_form;
	}
	public Medication() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Medication(String drug_id, String drug_name, String drug_generic_name, String drug_brand_name,
			String drug_form) {
		super();
		this.drug_id = drug_id;
		this.drug_name = drug_name;
		this.drug_generic_name = drug_generic_name;
		this.drug_brand_name = drug_brand_name;
		this.drug_form = drug_form;
	}
	@Override
	public String toString() {
		return "Medication [drug_id=" + drug_id + ", drug_name=" + drug_name + ", drug_generic_name="
				+ drug_generic_name + ", drug_brand_name=" + drug_brand_name + ", drug_form=" + drug_form + "]";
	}
	
	
}
