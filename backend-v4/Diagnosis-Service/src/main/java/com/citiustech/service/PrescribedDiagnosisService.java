package com.citiustech.service;

import java.util.List;

import com.citiustech.model.PrescribedDiagnosis;

public interface PrescribedDiagnosisService {

	PrescribedDiagnosis saveDetails(PrescribedDiagnosis prescribedDiagnosis);

	// List<Upcomingappointments> getAllAppointments();

	List<PrescribedDiagnosis> getAllVitalsDetails();

	PrescribedDiagnosis updateUser(String id, PrescribedDiagnosis details);

	PrescribedDiagnosis delete(String id);
	PrescribedDiagnosis[] findDiagnosisByMeeingId(int meetingid);
}
