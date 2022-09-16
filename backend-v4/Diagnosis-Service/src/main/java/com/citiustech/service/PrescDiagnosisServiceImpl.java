package com.citiustech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.PrescribedDiagnosis;
import com.citiustech.repository.PrescribedDiagnosisrepo;

@Service
public class PrescDiagnosisServiceImpl implements PrescribedDiagnosisService {
	@Autowired
	PrescribedDiagnosisrepo prescribedDiagnosisrepo;

	@Override
	public PrescribedDiagnosis saveDetails(PrescribedDiagnosis prescribedDiagnosis) {
		// TODO Auto-generated method stub
	
		return prescribedDiagnosisrepo.save(prescribedDiagnosis);
	}

	@Override
	public List<PrescribedDiagnosis> getAllVitalsDetails() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrescribedDiagnosis updateUser(String id, PrescribedDiagnosis details) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrescribedDiagnosis delete(String id) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public PrescribedDiagnosis[] findDiagnosisByMeeingId(int meetingid) {
		return prescribedDiagnosisrepo.findDiagnosisByMeeingId(meetingid);
	}
}
