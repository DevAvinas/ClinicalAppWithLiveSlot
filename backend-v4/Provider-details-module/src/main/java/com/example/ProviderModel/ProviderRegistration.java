package com.example.ProviderModel;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import java.util.List;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class ProviderRegistration {
	@Id
	@GenericGenerator(name = "seq_id", strategy = "com.example.utility.ProviderIdGenerator")
	@GeneratedValue(generator = "seq_id")
	String provider_id;
	@Column
	String title;
	@Column
	String firstname;
	@Column
	String lastname;
	@Column
	String email;
	@Column
	String dob;

	@Column
	String password;
	@Column
	String role = "provider";
	@Column
	boolean active = true;

	@Column
	String dor = new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
	
	@Column
	boolean otpFlag=true;
//	@Column
//	boolean active =true;
//	
//	@Column
//	String dor =new SimpleDateFormat("yyyy-MM-dd").format(new Date()).toString();
	public ProviderRegistration() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getProvider_id() {
		return provider_id;
	}

	public void setProvider_id(String provider_id) {
		this.provider_id = provider_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public boolean isOtpFlag() {
		return otpFlag;
	}

	public void setOtpFlag(boolean otpFlag) {
		this.otpFlag = otpFlag;
	}

	public String getDor() {
		return dor;
	}

	public void setDor(String dor) {
		this.dor = dor;
	}

	
}
