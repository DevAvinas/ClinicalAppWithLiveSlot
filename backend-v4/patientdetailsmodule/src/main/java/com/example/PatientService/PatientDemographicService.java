package com.example.PatientService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.PatientModel.PatientDemographicDetails;
import com.example.Patientdao.PatientDemographicDetailsRepository;

public interface PatientDemographicService {

	PatientDemographicDetails savePatientDetails(PatientDemographicDetails patientDemographicDetails);
	
	public PatientDemographicDetails checkDemoExists(String patient_id);
	
//	List<PatientDemographicDetails> getAllPatientDetails();
//	
//	PatientDemographicDetails updateUser(String id, PatientDemographicDetails details);
//
//	PatientDemographicDetails delete(String id);
}
