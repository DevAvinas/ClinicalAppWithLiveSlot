package com.citiustech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Appointment;
import com.citiustech.model.ApptEditHistory;
import com.citiustech.repo.AppointmentHistoryRepo;
import com.citiustech.repo.ApptRepo;

@Service
public class ApptHistoryServiceImpl implements ApptHistoryService {
	@Autowired
	AppointmentHistoryRepo appointmentHistoryRepo;

	@Override
	public ApptEditHistory[] provNotificationsOfPhy(String phyId, String status, String reason) {
		return appointmentHistoryRepo.findByPhyIdAndStatusOrReason(phyId, status, reason);
	}

	@Override
	public List<ApptEditHistory> getHistorytByMeetingId(int meetingid) {
		// TODO Auto-generated method stub
		return appointmentHistoryRepo.findByMeetId(meetingid);
	}

	@Override
	public List<ApptEditHistory> getApptByPatientId(String patientid) {
		// TODO Auto-generated method stub
		return appointmentHistoryRepo.findByPatientId(patientid);
	}

	@Override
	public ApptEditHistory[] getApptByProviderId(String providerid) {
		// TODO Auto-generated method stub
		return appointmentHistoryRepo.findByPhyId(providerid);
	}

}
