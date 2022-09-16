package com.citiustech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.citiustech.model.PrescribedMedication;
import com.citiustech.model.Procedure;


public interface PrescribedMedicationRepo  extends JpaRepository<PrescribedMedication, String>{
	PrescribedMedication[] findByMeetingid(int meetingid);
}
