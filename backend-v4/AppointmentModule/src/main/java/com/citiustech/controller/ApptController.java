package com.citiustech.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.DTO.PhysicianDTO;
import com.citiustech.model.Appointment;
import com.citiustech.model.ApptEditHistory;
import com.citiustech.service.ApptHistoryService;
import com.citiustech.service.ApptService;

import io.swagger.annotations.Api;

@CrossOrigin
@RestController
@RequestMapping("/api/private/appt")
@Api(value = "This is the Appointment controller with endpoints of POST, GET, PUT request")
public class ApptController {

	@Autowired
	ApptService apptService;

	@Autowired
	ApptHistoryService appthistserv;

	@GetMapping("/test")
	public String test() {
		String result = "asdko";
		return result;
	}

	@PostMapping("/newappt")
	public ResponseEntity<Appointment> CreateAppt(@RequestBody Appointment newAppt) {
		System.out.println();
		System.out.println("#####################################");
		System.out.println("New Appt-------------" + newAppt.toString());
		Appointment savedAppt = apptService.createAppt(newAppt);
		return new ResponseEntity<Appointment>(savedAppt, HttpStatus.CREATED);
	}

	@GetMapping("/slots/{phyId}/{apptDt}")
	public ResponseEntity<Appointment[]> getSlotsOfPhy(@PathVariable("phyId") String phyId,
			@PathVariable("apptDt") String apptDt) {
		System.out.println("Getting Slots...............");
		Appointment[] savedApptArr = apptService.getSlotsOfPhy(phyId, Date.valueOf(apptDt));
		if (savedApptArr.length < 0) {
			return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);
		} else {

			List<Appointment> filteredApptArr = new ArrayList<Appointment>();

			for (Appointment appt : savedApptArr) {

				if (appt.getStatus().equals("request") || appt.getStatus().equals("confirm")) {

					System.out.println("Filtered slots: " + appt.toString());
					filteredApptArr.add(appt);
				}

			}
			return new ResponseEntity<Appointment[]>(filteredApptArr.stream().toArray(Appointment[]::new),
					HttpStatus.OK);
		}
	}

	@GetMapping("/listphysician/{patientid}/{status}")
	public ResponseEntity<List<Appointment>> getPhysicianByStatus(@PathVariable("patientid") String patientid,
			@PathVariable("status") String status) {
		System.out.println("Getting Slots...............");
		List<Appointment> savedApptArr = apptService.getPhysicianByStatus(patientid, status);
		return new ResponseEntity<List<Appointment>>(savedApptArr, HttpStatus.OK);

	}

	@GetMapping("/appointment/{meetingid}")
	public ResponseEntity<Appointment> getApptByMeetingId(@PathVariable("meetingid") String meetingid) {
		System.out.println("Getting Slots...............");
		Appointment savedApptArr = apptService.getApptByMeetingId(Integer.parseInt(meetingid));
		return new ResponseEntity<Appointment>(savedApptArr, HttpStatus.OK);

	}

	@GetMapping("/getReqslots/{phyid}/{status}")
	public ResponseEntity<Optional<Appointment[]>> getapptreqOfPhy(@PathVariable("phyid") String phyId,
			@PathVariable("status") String status) {
		System.out.println("Getting Slots...............");

		Optional<Appointment[]> savedApptReq = apptService.getappointreqOfPhy(phyId, status);
		if (savedApptReq == null)
			System.out.println("No requested appointments!");
		return new ResponseEntity<Optional<Appointment[]>>(savedApptReq, HttpStatus.OK);

	}

	@PutMapping("/acceptappt/{meetingid}")
	public ResponseEntity<Appointment> getapptacceptreq(@PathVariable("meetingid") int meetid,
			@RequestBody(required = false) Appointment appoint) {
		System.out.println("Getting Slots...............");

		System.out.println(appoint);

		Appointment savedApptReq = apptService.getappointacceptreq(meetid, appoint);

		return new ResponseEntity<Appointment>(savedApptReq, HttpStatus.OK);

	}

//	@GetMapping("/ApptsAndStatusOfPhy/{phyId}/{status}")
//	public ResponseEntity<Appointment[]> ApptsAndStatusOfPhy(@PathVariable("phyId") String phyId,
//			@PathVariable("status") String status) {
//		Appointment[] savedApptArr = apptService.confirmedApptsOfPhy(phyId, status);
//		return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);
//	}

	@GetMapping("/ApptsAndStatusOfPhy/{phyId}/{status}/{type}")
	public ResponseEntity<Appointment[]> ApptsAndStatusOfPhy(@PathVariable("phyId") String phyId,
			@PathVariable("status") String status, @PathVariable("type") String appttype) {
		Appointment[] savedApptArr = apptService.confirmedApptsOfPhy(phyId, status, appttype);
		return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);
	}

	@GetMapping("/oldappts/{phyId}/{status}")
	public ResponseEntity<Optional<Appointment[]>> Oldappts(@PathVariable("phyId") String phyId,
			@PathVariable("status") String status) {
		Optional<Appointment[]> savedApptArr = apptService.getappointreqOfPhy(phyId, status);
		return new ResponseEntity<Optional<Appointment[]>>(savedApptArr, HttpStatus.OK);
	}

	@PutMapping("/completeappt/{meetingid}")
	public ResponseEntity<Appointment> getapptcompleted(@PathVariable("meetingid") int meetid,
			@RequestBody(required = false) Appointment appoint) {
		System.out.println("Getting Slots...............");

		System.out.println(appoint);

		Appointment savedApptReq = apptService.getappointacceptreq(meetid, appoint);

		return new ResponseEntity<Appointment>(savedApptReq, HttpStatus.OK);

	}

	@GetMapping("/checkPatientAppointmentClash/{patId}/{apptDt}/{apptFrTime}")
	public ResponseEntity<Appointment[]> checkPatientAppointmentClash(@PathVariable("patId") String patId,
			@PathVariable("apptDt") String apptDt, @PathVariable("apptFrTime") String apptFrTime) {

		System.out.println(apptFrTime);
		System.out.println("Inputs: " + patId + Date.valueOf(apptDt));

		Appointment[] savedApptArr = apptService.checkPatientAppointmentClash(patId, Date.valueOf(apptDt));

		if (savedApptArr.length == 0) {
			return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);
		} else {
			List<Appointment> filteredApptArr = new ArrayList<Appointment>();
			for (Appointment appt : savedApptArr) {
				System.out.println("appointment Time: " + appt.getApptFrTime().toString());
				if (appt.getApptFrTime().toString().equals(apptFrTime)) {
					System.out.println("Time Clash!");
					if (appt.getStatus().equals("request") || appt.getStatus().equals("confirm")) {
						System.out.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
						System.out.println("Filtered Appointments: " + appt.toString());
						filteredApptArr.add(appt);
					}
				}
			}
			return new ResponseEntity<Appointment[]>(filteredApptArr.stream().toArray(Appointment[]::new),
					HttpStatus.OK);
		}

	}

	@PutMapping("/updateAppt/{meetId}")
	public ResponseEntity<Appointment> updateAppt(@PathVariable("meetId") int meetId,
			@RequestBody Appointment newAppt) {
		Appointment savedAppt = apptService.updateAppt(meetId, newAppt);
		return new ResponseEntity<Appointment>(savedAppt, HttpStatus.OK);
	}

	@GetMapping("/countOfAppts")
	public ResponseEntity<Long> countOfAppts() {
		long count = apptService.countOfAppts();
		return new ResponseEntity<Long>(count, HttpStatus.OK);
	}

	@GetMapping("/providernotifications/{phyId}/{status}/{reason}")
	public ResponseEntity<ApptEditHistory[]> NotificationOfAppts(@PathVariable("phyId") String phyId,
			@PathVariable("status") String status, @PathVariable("reason") String reason) {
		ApptEditHistory[] savedApptArr = appthistserv.provNotificationsOfPhy(phyId, status, reason);
		return new ResponseEntity<ApptEditHistory[]>(savedApptArr, HttpStatus.OK);

	}

	@GetMapping("/getaptbystatus/{status}")
	public ResponseEntity<Appointment[]> getApptByMeetingstatus(@PathVariable("status") String status) {
		System.out.println("Getting Slots...............");
		Appointment[] savedApptArr = apptService.findBystatus(status);
		return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);
	}

	// Avinash
	@GetMapping("/status/{patientid}/{statuses}")
	public ResponseEntity<Appointment[]> getppointmentByStatus(@PathVariable("statuses") String[] statuses,
			@PathVariable("patientid") String patientid) {
		System.out.println("Getting Slots...............");
		Appointment[] savedApptArr = apptService.filterAppointment(statuses, patientid);
		return new ResponseEntity<Appointment[]>(savedApptArr, HttpStatus.OK);

	}
	

}
