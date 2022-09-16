package com.citiustech.controller;

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

import com.citiustech.model.PrescribedDiagnosis;
import com.citiustech.model.PrescribedProcedure;
import com.citiustech.service.PrescribedDiagnosisService;
import com.citiustech.service.PrescribedProcedureservice;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Provider vitals controller with endpoints of POST, GET, PUT request")
public class PrescProcedureController {

	@Autowired
	PrescribedProcedureservice prescribedProcedureService;

	@PostMapping("/save/procedure")
	public ResponseEntity<PrescribedProcedure> saveVitals(@RequestBody PrescribedProcedure prescribedProcedure) {
		System.out.println("-----procedure-----------------");
		System.out.println(prescribedProcedure.toString());

		PrescribedProcedure savedUser = prescribedProcedureService.saveDetails(prescribedProcedure);
		return new ResponseEntity<PrescribedProcedure>(savedUser, HttpStatus.CREATED);

	}
	@GetMapping("/findprocedureByMeeingId/{meetingid}")
	public ResponseEntity<PrescribedProcedure[]> findDiagnosisByMeeingId(@PathVariable int meetingid) {
		PrescribedProcedure[] savedUser = prescribedProcedureService.findProcedureByMeeingId(meetingid);
		return new ResponseEntity<PrescribedProcedure[]>(savedUser, HttpStatus.OK);
	}
}
