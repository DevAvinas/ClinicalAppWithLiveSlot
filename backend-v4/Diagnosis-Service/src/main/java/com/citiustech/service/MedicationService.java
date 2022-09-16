package com.citiustech.service;

import java.util.List;
import java.util.Optional;

import com.citiustech.model.Medication;
import com.citiustech.model.PrescribedMedication;
import com.citiustech.model.Procedure;



public interface MedicationService {
	List<Medication> getAllMedications();
	Optional<Medication> findBydrug_id(String drug_id);
	Optional<Medication> findbydrugname(String drug_name);
	PrescribedMedication saveDetails(PrescribedMedication prescribedmedication);
	PrescribedMedication[] findBymeetingId(int meetingid);
}
