package com.example.PatientController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PatientModel.Address;
import com.example.PatientModel.PatientEmergencyDetails;
import com.example.PatientService.EmergencyDetailsService;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
public class EmergencyDetailsController {
	@Autowired
	EmergencyDetailsService emergencyDetailsService;
	
	@PostMapping("/savemergencydetails")
	public ResponseEntity<PatientEmergencyDetails> saveDemo(@RequestBody PatientEmergencyDetails patientEmergencyDetails)  {
		System.out.println("-----DEMO-----------------");
		System.out.println(patientEmergencyDetails.toString());
		PatientEmergencyDetails savedUser = emergencyDetailsService.save(patientEmergencyDetails);
		return new ResponseEntity<PatientEmergencyDetails>(savedUser,HttpStatus.CREATED);
	}
}
