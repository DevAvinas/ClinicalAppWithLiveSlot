package com.citiustech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Medication;
import com.citiustech.model.PrescribedMedication;
import com.citiustech.repository.MedicationRepository;
import com.citiustech.repository.PrescribedMedicationRepo;





@Service
public class MedicationServiceImpl implements MedicationService {

	@Autowired
	MedicationRepository medicationrepo;
	
	@Autowired
	PrescribedMedicationRepo prescribedmedicationrepo;
	
	
	@Override
	public List<Medication> getAllMedications() {
		// TODO Auto-generated method stub
		return medicationrepo.findAll();
	}

	@Override
	public Optional<Medication> findBydrug_id(String drug_id) {
		// TODO Auto-generated method stub
		return medicationrepo.findById(drug_id);
	}

	@Override
	public Optional<Medication> findbydrugname(String drug_name) {
		// TODO Auto-generated method stub
		return medicationrepo.findBydrug_name(drug_name);
	}

	@Override
	public PrescribedMedication saveDetails(PrescribedMedication prescribedmedication) {
		// TODO Auto-generated method stub
		return  prescribedmedicationrepo.save(prescribedmedication) ;
	}
	@Override
	public PrescribedMedication[] findBymeetingId(int meetingid) {
		// TODO Auto-generated method stub
		return prescribedmedicationrepo.findByMeetingid(meetingid);
	}
}
