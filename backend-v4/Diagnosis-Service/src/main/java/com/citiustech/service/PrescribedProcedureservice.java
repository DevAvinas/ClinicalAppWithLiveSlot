package com.citiustech.service;

import java.util.List;

import com.citiustech.model.PrescribedDiagnosis;
import com.citiustech.model.PrescribedProcedure;

public interface PrescribedProcedureservice {
	PrescribedProcedure saveDetails(PrescribedProcedure prescribedProcedure);

	// List<Upcomingappointments> getAllAppointments();

	List<PrescribedProcedure> getAllVitalsDetails();

	PrescribedProcedure updateUser(String id, PrescribedProcedure details);

	PrescribedProcedure delete(String id);
	PrescribedProcedure[] findProcedureByMeeingId(int meetingid);

}
