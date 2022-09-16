package com.example.ProviderController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.ProviderModel.ProviderRegistration;
import com.example.ProviderService.RegistrationService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Provider Registration controller with endpoints of POST, GET, PUT request")

public class ProviderRegistrationController {
	@Autowired
	RegistrationService registrationService;
	
	Map<String, String> map = new HashMap<>();
	@GetMapping("/test")
	public String test() {
		return "works";
	}

	@GetMapping("/all/provider")
	public ResponseEntity<List<ProviderRegistration>> getAllPatients() {

		List<ProviderRegistration> savedUser = registrationService.getAllPatients();
		return new ResponseEntity<List<ProviderRegistration>>(savedUser, HttpStatus.OK);

	}

	@PutMapping("/update/provider/{email}")
	public ResponseEntity<ProviderRegistration> updatePatient(@PathVariable String email,
			@RequestBody ProviderRegistration pat1) {

		ProviderRegistration pat = registrationService.updatePatientdetail(pat1, email);

		return new ResponseEntity<ProviderRegistration>(pat, HttpStatus.OK);

	}

	@DeleteMapping("/delete/provider/{patient_id}")
	public ResponseEntity<ProviderRegistration> deletePatient(@PathVariable String patient_id) {
		registrationService.deleteDetails(patient_id);
		return new ResponseEntity<ProviderRegistration>(HttpStatus.OK);

	}

	@GetMapping("/find/provider/byemail/{email}")
	public ResponseEntity<ProviderRegistration> findPatientByEmailId(@PathVariable String email) {
		ProviderRegistration savedUser = registrationService.findPatientByEmail(email);

		if (savedUser == null)
			System.out.println("provider Does not exist!");
		return new ResponseEntity<ProviderRegistration>(savedUser, HttpStatus.OK);
	}

	
	@GetMapping("/allphysicians")	
	public ResponseEntity<List<ProviderRegistration>> allphysicians()
	{		//System.out.println("Getting Slots...............");		
		List<ProviderRegistration> savedApptArr= registrationService.allphysicians();		
		return new ResponseEntity<List<ProviderRegistration>>(savedApptArr,HttpStatus.OK);		
		}
	
	@GetMapping("/getbyproviderid/{providerid}")
	public ResponseEntity<ProviderRegistration> getbyProviderId(@PathVariable String providerid) {

		ProviderRegistration savedUser = registrationService.getByProviderid(providerid);
		return new ResponseEntity<ProviderRegistration>(savedUser, HttpStatus.OK);

	}
	
	@GetMapping("/adminResetPassword/{email}")
	public ResponseEntity<?> adminResetPassword(@PathVariable String email) {
		
	map.clear();
	ProviderRegistration modifiedUser = registrationService.adminResetPassword(email);
	if (modifiedUser.isOtpFlag()) {
	registrationService.createProviderOtp(email);
	map.put("message", "Password was Reset Successfully");
	} else
	map.put("message", "Password couldnt be Reset");
	return new ResponseEntity<>(map, HttpStatus.OK);
	}
	//Raghu
	@GetMapping("/countOfDoctors")
	public ResponseEntity<Long> countOfDoctors(){
	long count=registrationService.countByRole("Doctor");
	return new ResponseEntity<Long>(count,HttpStatus.OK);
	}
	@GetMapping("/countOfNurse")
	public ResponseEntity<Long> countOfNurse(){
	long count=registrationService.countByRole("Nurse");
	return new ResponseEntity<Long>(count,HttpStatus.OK);
	}
	}

