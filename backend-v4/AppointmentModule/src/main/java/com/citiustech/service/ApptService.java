package com.citiustech.service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.citiustech.model.Appointment;
import com.citiustech.repo.ApptRepo;
import com.citiustech.utility.EmailService;

@Service
public class ApptService {
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	ApptRepo apptRepo;
	@Autowired
	private EmailService emailService;
	@Autowired
	private Environment env;

//	public Appointment createAppt(Appointment newAppt) {
//		return apptRepo.save(newAppt);
//	}

	public Appointment createAppt(Appointment newAppt) {
		Map<String, String> hm = new HashMap<String, String>();
		hm.put("09:00", "9 A.M. - 10 A.M.");
		hm.put("10:00", "10 A.M. - 11 A.M.");
		hm.put("11:00", "11 A.M. - 12 P.M.");
		hm.put("12:00", "12 P.M - 1 P.M.");
		hm.put("14:00", "2 P.M. - 3 P.M.");
		hm.put("15:00", "3 P.M. - 4 P.M.");
		hm.put("16:00", "4 P.M. - 5 P.M.");
		Appointment response = apptRepo.save(newAppt);
		if (response != null) {
			if (response.getReason().toLowerCase().contains("reschedule")) {
				System.out.println(response.getApptFrTime().toString());
				emailService.sendMail(env.getProperty("reciever"), "Booking Rescheduled",
						"Hi,Your Appointment with doctor " + response.getPhyname() + " has been rescheduled to "
								+ response.getApptDt() + " for time Slot " + hm.get(response.getApptFrTime().toString())
								+ " with Meeting Id " + response.getMeetId());
			} else if (response.getStatus().toLowerCase().equals("decline")) {
				emailService.sendMail(env.getProperty("reciever"), "Booking Declined",
						"Hi,Your Appointment with doctor " + response.getPhyname() + " has been Declined "
								+ " with Meeting Id " + response.getMeetId());
			} else if (response.getStatus().toLowerCase().equals("request")) {
				emailService.sendMail("avinash.kumar@citiustech.com", "Booking Request created",
						"Hi,An Appointment request with doctor " + response.getPhyname() + " has been created for date "
								+ response.getApptDt() + " and for time Slot "
								+ hm.get(response.getApptFrTime().toString()) + " with Meeting Id "
								+ response.getMeetId());
			} else if (response.getStatus().toLowerCase().equals("confirm")) {
				emailService.sendMail(env.getProperty("reciever"), "Booking Confirmation",
						"Hi,An Appointment request with doctor " + response.getPhyname()
								+ " has been Confirmed for date " + response.getApptDt() + "and for time Slot "
								+ hm.get(response.getApptFrTime().toString()) + " with Meeting Id "
								+ response.getMeetId());
			}
		}
		return response;
	}

	public Appointment[] getSlotsOfPhy(String phyId, Date apptDt) {
		return apptRepo.findByPhyIdAndApptDt(phyId, apptDt);
	}

	public List<Appointment> getPhysicianByStatus(String patientid, String status) {
//		List<String> ids = new ArrayList<>();
//		Appointment[] emp= apptRepo.PhysicianStatus(patientid, status);
//		for(Appointment c :emp) {
//			ids.add(c.getPhyId());
//			System.out.println(c.getPhyId());
//		}
////		ids.add("PR003");
//		String points = String.join(",", ids);
//
//		String apiUrl = "http://127.0.0.1:8087/api/public/physician/{phyid}";
//		List result = restTemplate.getForObject(apiUrl, List.class, points);
//
//		System.out.println(result);
		// TODO Auto-generated method stub
		return apptRepo.PhysicianStatus(patientid, status);
	}

	public Appointment getApptByMeetingId(int meetingid) {
		// TODO Auto-generated method stub
		return apptRepo.findByMeetId(meetingid);
	}

	public Optional<Appointment[]> getappointreqOfPhy(String phyId, String status) {

		return apptRepo.findByphyIdAndStatus(phyId, status);
	}

	public Appointment getappointacceptreq(int meetid, Appointment appoint) {

		Appointment temp = apptRepo.findBymeetId(meetid);
		temp.setStatus(appoint.getStatus());
		temp.setChangedbyId(appoint.getChangedbyId());
		temp.setReason(appoint.getReason());

		return apptRepo.save(temp);

	}

//	public Appointment[] confirmedApptsOfPhy(String phyId, String status) {
//		return apptRepo.findByPhyIdAndStatus(phyId, status);
//	}
	public Appointment[] confirmedApptsOfPhy(String phyId, String status, String appttype) {
		return apptRepo.findByPhyIdAndStatusAndApptType(phyId, status, appttype);
	}

	public Appointment[] checkPatientAppointmentClash(String phyId, Date apptDt) {
		return apptRepo.findByPatientIdAndApptDt(phyId, apptDt);
	}

	public Appointment updateAppt(int meetId, Appointment newAppt) {
		Appointment tempAppt = apptRepo.findById(meetId).get();

		tempAppt.setDescription(newAppt.getMeetingTitle());
		tempAppt.setApptDt(newAppt.getApptDt());
		tempAppt.setApptFrTime(newAppt.getApptFrTime());
		tempAppt.setApptToTime(newAppt.getApptToTime());
		tempAppt.setChangedbyId(newAppt.getChangedbyId());
		tempAppt.setReason(newAppt.getReason());

		Appointment savedAppt = apptRepo.save(tempAppt);
		return savedAppt;
	}

	public long countOfAppts() {
		return apptRepo.count();
	}

	public Appointment[] findBystatus(String status) {
		return apptRepo.findBystatus(status);
	}

	public Appointment[] filterAppointment(String[] statuses, String patientid) {
		// TODO Auto-generated method stub
		return apptRepo.filterAppointment(statuses, patientid);
	}

}