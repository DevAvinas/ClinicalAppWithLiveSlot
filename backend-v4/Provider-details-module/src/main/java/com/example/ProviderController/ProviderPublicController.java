package com.example.ProviderController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

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
import com.example.utility.EmailService;
import com.example.ProviderExceptions.ProviderAlreadyExits;
import com.example.ProviderModel.ProviderOtp;
import com.example.ProviderModel.ProviderRegistration;
import com.example.ProviderService.RegistrationService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/public")
@Api(value = "This is the Provider Registration controller with endpoints of POST and Login")
public class ProviderPublicController {
	@Autowired
	RegistrationService registrationService;

	@Autowired
	private EmailService emailService;

	Map<String, String> map = new HashMap<>();

	@GetMapping("/trial")
	public String test() {
		return "trial";
	}

//	@PostMapping("/register/provider")
//	public ResponseEntity<ProviderRegistration> saveBook(@RequestBody ProviderRegistration providerRegistration)
//			throws ProviderAlreadyExits {
//		System.out.println("----------------------");
//		System.out.println(providerRegistration.toString());
//		ProviderRegistration savedUser = registrationService.savePatient(providerRegistration);
//		System.out.println("saved values are :" + savedUser);
//		return new ResponseEntity<ProviderRegistration>(savedUser, HttpStatus.CREATED);
//
//	}
	@PostMapping("/register/provider")
	public ResponseEntity<?> saveBook(@RequestBody ProviderRegistration providerRegistration)
			throws ProviderAlreadyExits {
		map.clear();
		System.out.println("----------------------");
		System.out.println(providerRegistration.toString());
		ProviderRegistration temp = registrationService.findPatientByEmail(providerRegistration.getEmail());
		if (temp == null) {
			ProviderRegistration savedUser = registrationService.savePatient(providerRegistration);
			System.out.println("saved values are :" + savedUser);
			ProviderOtp newOtp = registrationService.createProviderOtp(providerRegistration.getEmail());
			map.put("message", savedUser.getProvider_id());
			emailService.sendMail("avinash.kumar@citiustech.com", "CT General Hospital, NY",
					"Hi, Your password has been reset and your new password is: " + newOtp.getOtp() + "With validity"
							+ newOtp.getValidity());
			return new ResponseEntity<>(map, HttpStatus.CREATED);
		} else {
			map.put("message", "Provider already exists");
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
	}

	@GetMapping(value = "/sendmail")
	public String sendmail() {

		emailService.sendMail("Sonam.Singh2@citiustech.com", "CT General Hospital, NY",
				"Welcome to CT General Hospital , NY. This is test mail from your team mate "
						+ "avinash kumar for JAVA Impact 11 - Team 4");

		return "emailsent";
	}

	@PostMapping("/login/provider")
	public ResponseEntity<ProviderRegistration> login(@RequestBody LoginDTO loginDTO) throws ProviderAlreadyExits {

		ProviderRegistration savedUser = registrationService.findByEmailAndPassword(loginDTO.getUsernameOrEmail(),
				loginDTO.getPassword());
		return new ResponseEntity<ProviderRegistration>(savedUser, HttpStatus.OK);

	}

	// Avinash
	@GetMapping("/physician/{phyid}")
	public ResponseEntity<ProviderRegistration[]> getPhysicianByStatus(@PathVariable("phyid") String[] phyid) {
		System.out.println("Getting Slots...............");
		ProviderRegistration[] savedApptArr = registrationService.filterPhysician(phyid);
		return new ResponseEntity<ProviderRegistration[]>(savedApptArr, HttpStatus.OK);
	}

	@GetMapping("/find/provider/byemail/{email}")
	public ResponseEntity<ProviderRegistration> findPatientByEmailId(@PathVariable String email) {
		ProviderRegistration savedUser = registrationService.findPatientByEmail(email);
		if (savedUser == null)
			System.out.println("provider Does not exist!");
		return new ResponseEntity<ProviderRegistration>(savedUser, HttpStatus.OK);
	}

	@GetMapping("/changestatus/{email}/{status}")
	public ResponseEntity<Integer> changeStatusByEmailId(@PathVariable String email, @PathVariable String status) {
		Integer savedUser = registrationService.changeStatusByEmailId(email, status);
		if (savedUser == null)
			System.out.println("Patient Does not exist!");
		return new ResponseEntity<Integer>(savedUser, HttpStatus.OK);
	} // Raghu 21-04-2022

	@PostMapping("/checkProviderOtpFlag")
	public ResponseEntity<?> checkProviderOtpFlag(@RequestBody LoginDTO loginDTO) {
		map.clear();
		ProviderRegistration savedUser = registrationService.findPatientByEmail(loginDTO.getUsernameOrEmail());
		if (savedUser == null) {
			map.put("message", "Provider Does not exist");
			return new ResponseEntity<>(map, HttpStatus.OK);
		}
		if (savedUser.isOtpFlag()) {
			ProviderOtp otpUser = registrationService.checkProviderOtp(loginDTO.getUsernameOrEmail(),
					loginDTO.getPassword());
			if (otpUser == null)
				map.put("message", "Invalid OTP");
			else {
				if (otpUser.getValidity().isBefore(LocalDateTime.now()))
					map.put("message", "OTP Expired. Please Contact Admin");
				else
					map.put("message", "Valid OTP");
			}
		} else
			map.put("message", "No OTP");
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

	@PostMapping("/resetProviderPassword")
	public ResponseEntity<?> resetProviderPassword(@RequestBody LoginDTO loginDTO) {
		map.clear();
		ProviderRegistration modifiedUser = registrationService.resetProviderPassword(loginDTO.getUsernameOrEmail(),
				loginDTO.getPassword());
		if (modifiedUser.getPassword().equals(loginDTO.getPassword())) {
			registrationService.deleteOtp(loginDTO.getUsernameOrEmail());
			map.put("message", "Password was Reset Successfully");
		} else
			map.put("message", "Password couldnt be Reset");
		return new ResponseEntity<>(map, HttpStatus.OK);
	}

}