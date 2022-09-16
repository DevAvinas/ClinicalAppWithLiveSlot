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
import com.example.PatientModel.PatientDemographicDetails;
import com.example.PatientService.AddressService;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
public class AddressController {
	@Autowired
	AddressService addressService;
	
	@PostMapping("/saveaddress")
	public ResponseEntity<Address> saveDemo(@RequestBody Address address)  {
		System.out.println("-----DEMO-----------------");
		System.out.println(address.toString());
		Address savedUser = addressService.save(address);
		return new ResponseEntity<Address>(savedUser,HttpStatus.CREATED);
	}
	
	
}
