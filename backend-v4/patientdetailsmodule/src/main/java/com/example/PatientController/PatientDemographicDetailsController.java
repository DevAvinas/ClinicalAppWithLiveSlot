package com.example.PatientController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.PatientModel.PatientDemographicDetails;
import com.example.PatientService.PatientDemographicService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin
@Api(value="This is the Patient Details controller with endpoints of POST, GET, PUT request")
@RequestMapping("/api/private/")
@RestController
public class PatientDemographicDetailsController {
	
	@Autowired
	PatientDemographicService patientDemographicService;

	
	//check if PatientDetails exists
	@GetMapping("/checkDemo/{patient_id}")
	public ResponseEntity<Boolean> checkDemoExists(@PathVariable String patient_id) {
		
		boolean exists;
		PatientDemographicDetails savedUser = patientDemographicService.checkDemoExists( patient_id);
		if(savedUser==null) exists=false;
		else exists=true;
		return new ResponseEntity<Boolean>(exists,HttpStatus.OK);
		
	}
	
	
	
	
	@PostMapping("/savedemo")
	public ResponseEntity<PatientDemographicDetails> saveDemo(@RequestBody PatientDemographicDetails patientDemographicDetails)  {
		System.out.println("-----DEMO-----------------");
		System.out.println(patientDemographicDetails.toString());
		PatientDemographicDetails savedUser = patientDemographicService.savePatientDetails(patientDemographicDetails);
		return new ResponseEntity<PatientDemographicDetails>(savedUser,HttpStatus.CREATED);
	}
//	@GetMapping("/patientdetails")
//	public ResponseEntity<List<PatientDemographicDetails>> getAllDemo() {
//		
//
//		List<PatientDemographicDetails> savedUser = patientDemographicService.getAllPatientDetails();
//		return new ResponseEntity<List<PatientDemographicDetails>>(savedUser,HttpStatus.OK);
//		
//	}
//	@ApiOperation(value = "Delete Call", response = PatientDemographicDetails.class, tags = "Deleting Patient Demographic details")
//	@DeleteMapping("/patientdetails/{id}")
//	public ResponseEntity<PatientDemographicDetails> deleteUser(@PathVariable int id) {
//	patientDemographicService.delete(id);
//	return new ResponseEntity<PatientDemographicDetails>(HttpStatus.OK);
//	}

//	@ApiOperation(value = "Put Call", response = PatientDemographicDetails.class, tags = "Updating Patient Demographic details")
//	@PutMapping("/patientdetails/{id}")
//	public ResponseEntity<PatientDemographicDetails> updateUser(@PathVariable String id,
//	        @RequestBody PatientDemographicDetails u) {
//	    PatientDemographicDetails u2 = patientDemographicService.updateUser(id, u);
//	    return new ResponseEntity<PatientDemographicDetails>(u2, HttpStatus.OK);
//	}
}
