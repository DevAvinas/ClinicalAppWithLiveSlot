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
import com.citiustech.service.PrescribedDiagnosisService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Provider vitals controller with endpoints of POST, GET, PUT request")
public class PresDiagnosisController {
	@Autowired
	PrescribedDiagnosisService prescribedDiagnosisService;

	@PostMapping("/adddiagnosis")
	public ResponseEntity<PrescribedDiagnosis> saveVitals(@RequestBody PrescribedDiagnosis prescribedDiagnosis) {
		System.out.println("-----diagnosis-----------------");
		System.out.println(prescribedDiagnosis.getMeeting_id());

		PrescribedDiagnosis savedUser = prescribedDiagnosisService.saveDetails(prescribedDiagnosis);
		return new ResponseEntity<PrescribedDiagnosis>(savedUser, HttpStatus.CREATED);

	}
	
	@GetMapping("/findDiagnosisByMeeingId/{meetingid}")
	public ResponseEntity<PrescribedDiagnosis[]> findDiagnosisByMeeingId(@PathVariable int meetingid) {
		PrescribedDiagnosis[] savedUser = prescribedDiagnosisService.findDiagnosisByMeeingId(meetingid);
		return new ResponseEntity<PrescribedDiagnosis[]>(savedUser, HttpStatus.OK);
	}

}
