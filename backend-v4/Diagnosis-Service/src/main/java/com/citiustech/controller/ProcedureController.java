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

import com.citiustech.model.Procedure;
import com.citiustech.service.ProcedureService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private")
@Api(value = "This is the Procedure service Controller")
public class ProcedureController {
	@Autowired
	ProcedureService procedureService;

	@GetMapping("/testing")
	public String test() {
		return "trial";
	}

	@GetMapping("/provider/all/procedure")
	public ResponseEntity<List<Procedure>> getAllDiagnosis() {

		List<Procedure> listOfProcedure = procedureService.getAllProcedure();
		return new ResponseEntity<List<Procedure>>(listOfProcedure, HttpStatus.OK);

	}

//	@PostMapping("/provider/procedure")
//	public ResponseEntity<Procedure> saveDiagnosis(@RequestBody Procedure procedure) {
//		// System.out.println("--------------helooooooooo--------");
//		System.out.println(procedure.toString());
//		Procedure savedDiagnosis = procedureService.saveProcedure(procedure);
//		System.out.println("saved values are :" + savedDiagnosis);
//		return new ResponseEntity<Procedure>(savedDiagnosis, HttpStatus.CREATED);
//
//	}

	@GetMapping("/provider/all/procedure/{ProcedureCode}")
	public ResponseEntity<Optional<Procedure>> findDiagnosisByCode(@PathVariable String ProcedureCode) {
		Optional<Procedure> savedUser = procedureService.findByProcedureCode(ProcedureCode);

		if (savedUser == null)
			System.out.println("procedure code Does not exist!");
		return new ResponseEntity<Optional<Procedure>>(savedUser, HttpStatus.OK);
	}

	@GetMapping("/procedure")
	public ResponseEntity<Optional<Procedure>> findDiagnosisByDescription(
			@RequestParam(required = false) String ProcedureDescription) {
		Optional<Procedure> saved = procedureService.findByProcedureDescription(ProcedureDescription);

		if (saved == null)
			System.out.println("Procedure description Does not exist!");
		return new ResponseEntity<Optional<Procedure>>(saved, HttpStatus.OK);
	}

}
