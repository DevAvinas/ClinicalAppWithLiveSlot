package com.example.PatientService;

import java.util.List;

import com.example.PatientExceptions.PatientAlredyExistsException;
import com.example.PatientModel.PatientDemographicDetails;
import com.example.PatientModel.PatientRegistrationDetails;

public interface PatientRegistrationService {
	
	
	
	PatientRegistrationDetails savePatient(PatientRegistrationDetails patientRegistrationDetails) throws PatientAlredyExistsException;
	List<PatientRegistrationDetails> getAllPatients();
//	PatientRegistrationDetails updatePatientdetail(PatientRegistrationDetails patient, String email);
//	void deleteDetails(String patient_id);
	public PatientRegistrationDetails findPatientByEmail(String email);

	
	PatientRegistrationDetails findByEmailAndPassword(String usernameOrEmail, String password);
	int changeStatusByEmailId(String email, String status);
	PatientRegistrationDetails findById(String patientid);
	Integer resetpasswordEmailId(String email);
	
	long countOfPatients();
	PatientRegistrationDetails getByPatientid(String patientid);
	Integer updatePasswoerd(String email, String newpassword);

}
