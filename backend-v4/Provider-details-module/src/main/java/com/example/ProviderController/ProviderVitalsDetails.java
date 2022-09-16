package com.example.ProviderController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.ProviderModel.Upcomingappointments;
import com.example.ProviderModel.VitalsDetails;
import com.example.ProviderService.Providervitaldetailsservice;

import io.swagger.annotations.Api;



@CrossOrigin
@RestController
@RequestMapping("/api/private")
//@RequestMapping("/api/private") postman url:-http://localhost:8087/api/private/getappointmentable
@Api(value="This is the Provider vitals controller with endpoints of POST, GET, PUT request")
public class ProviderVitalsDetails {
	
	@Autowired
	Providervitaldetailsservice providervitaldetailsservice;
	

	@PostMapping("/savevitals")
	public ResponseEntity<VitalsDetails> saveVitals(@RequestBody VitalsDetails vitalsdetails)  {
		System.out.println("-----vitals-----------------");
		System.out.println(vitalsdetails.toString());
		
		VitalsDetails savedUser = providervitaldetailsservice.saveDetails(vitalsdetails);
		return new ResponseEntity<VitalsDetails>(savedUser,HttpStatus.CREATED);

	}
	
	@GetMapping("/getappointmentable")
	public ResponseEntity<List<Upcomingappointments>> getAllAppointmentgs() {

		List<Upcomingappointments> savedUser = providervitaldetailsservice.getAllAppointments();
		System.out.println(savedUser);
		return new ResponseEntity<List<Upcomingappointments>>(savedUser, HttpStatus.OK);

	}

	@GetMapping("/vital/{meetingid}")
	public ResponseEntity<VitalsDetails[]> getVitals(@PathVariable int meetingid)  {
		System.out.println("-----vitals-----------------");
		//System.out.println(vitalsdetails.toString());
		VitalsDetails[] savedUser = providervitaldetailsservice.findBymeetingId(meetingid);
		return new ResponseEntity<VitalsDetails[]>(savedUser,HttpStatus.CREATED);
	}
	
	@GetMapping("/checkvital/{meetingid}")
	public ResponseEntity<VitalsDetails> checkVitals(@PathVariable int meetingid)  {
		System.out.println("-----vitals-----------------");
		//System.out.println(vitalsdetails.toString());
		VitalsDetails savedUser = providervitaldetailsservice.findbymeetidandcheck(meetingid);
		return new ResponseEntity<VitalsDetails>(savedUser,HttpStatus.CREATED);
	}
}

