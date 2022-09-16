package com.example.PatientController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientRegistrationService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Patient Registration controller with endpoints of POST, GET, PUT request")
public class PatientController {
	@Autowired
	PatientRegistrationService patientRegistrationService;

//	@GetMapping("/test")
//	public String test() {
//		return "works";
//	}

//	
//	@PostMapping("/patient/register")
//	public ResponseEntity<PatientRegistrationDetails> saveBook(@RequestBody PatientRegistrationDetails patientRegistrationDetails) throws PatientAlredyExistsException  {
//		
//
//		PatientRegistrationDetails savedUser = patientRegistrationService.savePatient(patientRegistrationDetails);
//		return new ResponseEntity<PatientRegistrationDetails>(savedUser,HttpStatus.CREATED);
//		
//	}
	@GetMapping("/allpatient")
	public ResponseEntity<List<PatientRegistrationDetails>> getAllPatients() {

		List<PatientRegistrationDetails> savedUser = patientRegistrationService.getAllPatients();
		return new ResponseEntity<List<PatientRegistrationDetails>>(savedUser, HttpStatus.OK);

	}

//	@PutMapping("/update/{email}")
//	public ResponseEntity<PatientRegistrationDetails> updatePatient(@PathVariable String email,
//			@RequestBody PatientRegistrationDetails pat1) {
//
//		PatientRegistrationDetails pat = patientRegistrationService.updatePatientdetail(pat1, email);
//
//		return new ResponseEntity<PatientRegistrationDetails>(pat, HttpStatus.OK);
//
//	}

//	@DeleteMapping("/delete/{patient_id}")
//	public ResponseEntity<PatientRegistrationDetails> deletePatient(@PathVariable String patient_id) {
//		patientRegistrationService.deleteDetails(patient_id);
//		return new ResponseEntity<PatientRegistrationDetails>(HttpStatus.OK);
//
//	}

	@GetMapping("/findbyemail/{email}")
	public ResponseEntity<PatientRegistrationDetails> findPatientByEmailId(@PathVariable String email) {
		PatientRegistrationDetails savedUser = patientRegistrationService.findPatientByEmail(email);
		savedUser.setPassword("");
		if (savedUser == null)
			System.out.println("Patient Does not exist!");
		return new ResponseEntity<PatientRegistrationDetails>(savedUser, HttpStatus.OK);
	}

	@GetMapping("/getbypatientid/{patientid}")
	public ResponseEntity<PatientRegistrationDetails> getbyPatientId(@PathVariable String patientid) {

		PatientRegistrationDetails savedUser = patientRegistrationService.getByPatientid(patientid);
		return new ResponseEntity<PatientRegistrationDetails>(savedUser, HttpStatus.OK);

	}

	// Raghu 21-04-2022
	@GetMapping("/countOfPatients")
	public ResponseEntity<Long> countOfPatients() {
		long count = patientRegistrationService.countOfPatients();
		return new ResponseEntity<Long>(count, HttpStatus.OK);
	}
	
	

}
