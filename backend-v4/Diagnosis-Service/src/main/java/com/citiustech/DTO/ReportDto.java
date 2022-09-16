package com.citiustech.DTO;

import com.citiustech.model.PrescribedDiagnosis;
import com.citiustech.model.PrescribedMedication;
import com.citiustech.model.PrescribedProcedure;

public class ReportDto {
		
	PrescribedDiagnosis[] PrescribedDiagnosis;
	PrescribedMedication[] PrescribedMedication;
	PrescribedProcedure[] PrescribedProcedure;
	public ReportDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public PrescribedDiagnosis[] getPrescribedDiagnosis() {
		return PrescribedDiagnosis;
	}
	public void setPrescribedDiagnosis(PrescribedDiagnosis[] prescribedDiagnosis) {
		PrescribedDiagnosis = prescribedDiagnosis;
	}
	public PrescribedMedication[] getPrescribedMedication() {
		return PrescribedMedication;
	}
	public void setPrescribedMedication(PrescribedMedication[] prescribedMedication) {
		PrescribedMedication = prescribedMedication;
	}
	public PrescribedProcedure[] getPrescribedProcedure() {
		return PrescribedProcedure;
	}
	public void setPrescribedProcedure(PrescribedProcedure[] prescribedProcedure) {
		PrescribedProcedure = prescribedProcedure;
	}
	
	
	
	
	
}
