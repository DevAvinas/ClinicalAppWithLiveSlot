package com.citiustech.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.model.ApptEditHistory;
import com.citiustech.service.ApptHistoryService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private/appt")
@Api(value="This is the Appointment History controller with endpoints of POST, GET, PUT request")
public class AppointmentHistoryController {
	@Autowired
	ApptHistoryService apptHistoryService;
	
	@GetMapping("/history/{meetingid}")
	public ResponseEntity<List<ApptEditHistory>> getApptByMeetingId(@PathVariable("meetingid") String meetingid){
//		System.out.println("Getting Slots...............");
		List<ApptEditHistory> savedApptArr= apptHistoryService.getHistorytByMeetingId(Integer.parseInt(meetingid));
		return new ResponseEntity<List<ApptEditHistory>>(savedApptArr,HttpStatus.OK);
		
	}
	@GetMapping("/patient/history/{patientid}")
	public ResponseEntity<List<ApptEditHistory>> getApptByPatientId(@PathVariable("patientid") String patientid){
//		System.out.println("Getting Slots...............");
		List<ApptEditHistory> savedApptArr= apptHistoryService.getApptByPatientId(patientid);
		return new ResponseEntity<List<ApptEditHistory>>(savedApptArr,HttpStatus.OK);
		
	}
	@GetMapping("/provider/history/{providerid}")
	public ResponseEntity<ApptEditHistory[]> getApptByProviderId(@PathVariable("providerid") String providerid){
	// System.out.println("Getting Slots...............");
	ApptEditHistory[] savedApptArr= apptHistoryService.getApptByProviderId(providerid);
	return new ResponseEntity<ApptEditHistory[]>(savedApptArr,HttpStatus.OK);

	}
	
}
