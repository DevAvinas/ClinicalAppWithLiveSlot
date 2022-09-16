package com.citiustech.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.DTO.ReportDto;
import com.citiustech.model.Diagnosis;
import com.citiustech.service.DiagnosisService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Diagnosis service Controller")
public class DiagnosisController {
	@Autowired
	DiagnosisService diagnosisService;

	@GetMapping("/trial")
	public String test() {
		return "trial";
	}

	@GetMapping("/provider/all/diagnosis")
	public ResponseEntity<List<Diagnosis>> getAllDiagnosis() {

		List<Diagnosis> listOfDiagnosis = diagnosisService.getAllDiagnosis();
		return new ResponseEntity<List<Diagnosis>>(listOfDiagnosis, HttpStatus.OK);

	}

//	@PostMapping("/provider/diagnosis")
//	public ResponseEntity<Diagnosis> saveDiagnosis(@RequestBody Diagnosis diagnosis) {
//		System.out.println("--------------helooooooooo--------");
//		System.out.println(diagnosis.toString());
//		Diagnosis savedDiagnosis = diagnosisService.saveDiagnosis(diagnosis);
//		System.out.println("saved values are :" + savedDiagnosis);
//		return new ResponseEntity<Diagnosis>(savedDiagnosis, HttpStatus.CREATED);

//	}

	@GetMapping("/provider/all/diagnosis/{DiagnosisCode}")
	public ResponseEntity<Optional<Diagnosis>> findDiagnosisByCode(@PathVariable String DiagnosisCode) {
		Optional<Diagnosis> savedUser = diagnosisService.findByDiagnosisCode(DiagnosisCode);

		if (savedUser == null)
			System.out.println("diagnosis code Does not exist!");
		return new ResponseEntity<Optional<Diagnosis>>(savedUser, HttpStatus.OK);
	}

	@GetMapping("/diagnosis")
	public ResponseEntity<Optional<Diagnosis>> findDiagnosisByDescription(
			@RequestParam(required = false) String DiagnosisDescription) {
		Optional<Diagnosis> saved = diagnosisService.findByDiagnosisDescription(DiagnosisDescription);

		if (saved == null)
			System.out.println("diagnosis description Does not exist!");
		return new ResponseEntity<Optional<Diagnosis>>(saved, HttpStatus.OK);
	}
	@GetMapping("/provider/report/{meetingid}")
	public ResponseEntity<ReportDto> report(@PathVariable int meetingid) {
		ReportDto savedUser = diagnosisService.findBymeetingId(meetingid);

		if (savedUser == null)
			System.out.println("diagnosis code Does not exist!");
		return new ResponseEntity<ReportDto>(savedUser, HttpStatus.OK);
	}
}
