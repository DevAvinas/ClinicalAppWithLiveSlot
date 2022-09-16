package com.citiustech.controller;

import java.util.List;
import java.util.Optional;

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

import com.citiustech.model.Diagnosis;
import com.citiustech.model.Medication;
import com.citiustech.model.PrescribedMedication;
import com.citiustech.model.Procedure;
import com.citiustech.service.MedicationService;


import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private/")
@Api(value = "This is the Procedure service Controller")
public class Medicationcontroller {

	@Autowired
	MedicationService medicationservice;
	
	@GetMapping("/getMedicationDetails")
	public ResponseEntity<List<Medication>> getAllMedications() {

		List<Medication> listOfMedications = medicationservice.getAllMedications();
		return new ResponseEntity<List<Medication>>(listOfMedications, HttpStatus.OK);

	}
	
	@GetMapping("/getMedicationDetailsbyid/{drug_id}")
	public ResponseEntity<Optional<Medication>> findMedicationByCode(@PathVariable String drug_id) {
		Optional<Medication> savedUser = medicationservice.findBydrug_id(drug_id);

		if (savedUser == null)
			System.out.println("medication code Does not exist!");
		return new ResponseEntity<Optional<Medication>>(savedUser, HttpStatus.OK);
	}
	

	@GetMapping("/getMedicationDetailsbyname")
	public ResponseEntity<Optional<Medication>> findMedicationByname(@RequestParam(required = false) String drug_name) {
		Optional<Medication> savedUser = medicationservice.findbydrugname(drug_name);

		if (savedUser == null)
			System.out.println("medication name Does not exist!");
		return new ResponseEntity<Optional<Medication>>(savedUser, HttpStatus.OK);
	}
	
	@PostMapping("/addmedicationdetails")
	public ResponseEntity<PrescribedMedication> saveMedication(@RequestBody PrescribedMedication medication) {
		// System.out.println("--------------helooooooooo--------");
		System.out.println(medication.toString());
	PrescribedMedication savedmedication = medicationservice.saveDetails(medication);
		System.out.println("saved values are :" + savedmedication);
		return new ResponseEntity<PrescribedMedication>(savedmedication, HttpStatus.CREATED);

	}
	
	@GetMapping("/getmedicationoutput/{meetingid}")
	public ResponseEntity<PrescribedMedication[]> getVitals(@PathVariable int meetingid)  {
		System.out.println("-----vitals-----------------");
		//System.out.println(vitalsdetails.toString());
		PrescribedMedication[] savedUser = medicationservice.findBymeetingId(meetingid);
		return new ResponseEntity<PrescribedMedication[]>(savedUser,HttpStatus.CREATED);
	}
}
