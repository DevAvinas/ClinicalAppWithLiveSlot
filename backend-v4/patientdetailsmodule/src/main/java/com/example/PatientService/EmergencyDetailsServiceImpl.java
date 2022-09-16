package com.example.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PatientModel.PatientEmergencyDetails;
import com.example.Patientdao.EmergencyDetailsRepository;

@Service
public class EmergencyDetailsServiceImpl implements EmergencyDetailsService {

	@Autowired
	EmergencyDetailsRepository emergencyDetailsRepository;
	
	@Override
	public PatientEmergencyDetails save(PatientEmergencyDetails patientEmergencyDetails) {
		// TODO Auto-generated method stub
		return emergencyDetailsRepository.save(patientEmergencyDetails);
	}

}
