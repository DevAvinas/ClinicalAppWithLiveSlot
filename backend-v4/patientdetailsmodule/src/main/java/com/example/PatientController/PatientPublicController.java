package com.example.PatientController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.DTO.LoginDTO;
import com.example.DTO.ResetPasswordDTO;
import com.example.PatientExceptions.PatientAlredyExistsException;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientRegistrationService;
import com.example.PatientUtility.EmailService;

import io.swagger.annotations.Api;


@CrossOrigin
@RestController
@RequestMapping("/api/public")
@Api(value="This is the Patient Registration controller with endpoints of POST and Login")
public class PatientPublicController {
	@Autowired
	PatientRegistrationService patientRegistrationService;
	  @Autowired
	   private EmailService emailService;
	  
//	@GetMapping("/trial")
//	public String test(){
//		return "trial";
//	}
	
	@PostMapping("/register")
	public ResponseEntity<PatientRegistrationDetails> saveBook(@RequestBody PatientRegistrationDetails patientRegistrationDetails) throws PatientAlredyExistsException  {
		System.out.println("----------------------");
		System.out.println(patientRegistrationDetails.toString());
		PatientRegistrationDetails savedUser = patientRegistrationService.savePatient(patientRegistrationDetails);
		return new ResponseEntity<PatientRegistrationDetails>(savedUser,HttpStatus.CREATED);
		
	}
	
	@PostMapping("/login")
	public ResponseEntity<PatientRegistrationDetails> login(@RequestBody LoginDTO loginDTO) throws PatientAlredyExistsException  {
		
		PatientRegistrationDetails savedUser = patientRegistrationService.findByEmailAndPassword(loginDTO.getUsernameOrEmail(),loginDTO.getPassword());
		return new ResponseEntity<PatientRegistrationDetails>(savedUser,HttpStatus.OK);
		
	}	
	@GetMapping("/findbyemail/{email}")
	public ResponseEntity<PatientRegistrationDetails> findPatientByEmailId(@PathVariable String email){
	PatientRegistrationDetails savedUser = patientRegistrationService.findPatientByEmail(email);
	savedUser.setPassword("");
	if(savedUser==null)System.out.println("Patient Does not exist!");
	return new ResponseEntity<PatientRegistrationDetails>(savedUser,HttpStatus.OK);
	}
	@GetMapping("/changestatus/{email}/{status}")
	public ResponseEntity<Integer> changeStatusByEmailId(@PathVariable String email,@PathVariable String status){
		Integer savedUser = patientRegistrationService.changeStatusByEmailId(email,status);
		if(savedUser==null)System.out.println("Patient Does not exist!");
	return new ResponseEntity<Integer>(savedUser,HttpStatus.OK);
	}
	@GetMapping("/findbyId/{patientid}")
	public ResponseEntity<PatientRegistrationDetails> findById(@PathVariable String patientid){
	PatientRegistrationDetails savedUser = patientRegistrationService.findById(patientid);

	return new ResponseEntity<PatientRegistrationDetails>(savedUser,HttpStatus.OK);
	}
//	@GetMapping(value = "/sendmail")
//    public String sendmail() {
//
//        emailService.sendMail("sonam.singh2@citiustech.com", "CT General Hospital, NY", "Welcome to CT General Hospital , NY. This is test mail from your team mate "
//        		+ "avinash kumar for JAVA Impact 11 - Team 4");
//
//        return "emailsent";
//    }
	@GetMapping(value = "/resetpassword/{email}")
	public ResponseEntity<Integer> resetpasswordEmailId(@PathVariable String email){
		Integer savedUser = patientRegistrationService.resetpasswordEmailId(email);
		if(savedUser==null)System.out.println("Patient Does not exist!");
	return new ResponseEntity<Integer>(savedUser,HttpStatus.OK);
	}
	@PostMapping(value = "/updatepassword")
	public ResponseEntity<Integer> updatepassword(@RequestBody ResetPasswordDTO resetPasswordDTO){
		PatientRegistrationDetails temp = patientRegistrationService.findByEmailAndPassword(resetPasswordDTO.getEmail(), resetPasswordDTO.getOldpassword());
		Integer response=0;
		if(temp!=null) {
			response = patientRegistrationService.updatePasswoerd(resetPasswordDTO.getEmail(), resetPasswordDTO.getNewpassword());
		}
		
		return new ResponseEntity<Integer>(response,HttpStatus.OK);
	}	

}
