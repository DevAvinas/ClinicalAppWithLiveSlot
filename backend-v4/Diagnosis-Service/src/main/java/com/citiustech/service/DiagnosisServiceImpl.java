package com.citiustech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.DTO.ReportDto;
import com.citiustech.model.Diagnosis;
import com.citiustech.repository.DiagnosisRepository;
import com.citiustech.repository.PrescribedDiagnosisrepo;
import com.citiustech.repository.PrescribedMedicationRepo;
import com.citiustech.repository.PrescribedProcedurerepo;

@Service
public class DiagnosisServiceImpl implements DiagnosisService {
	@Autowired
	DiagnosisRepository diagnosisRepository;
	@Autowired
	PrescribedDiagnosisrepo prescribedDiagnosisrepo;
	@Autowired
	PrescribedProcedurerepo prescribedProcedurerepo;
	@Autowired
	PrescribedMedicationRepo prescribedmedicationrepo;
	@Override
	public Diagnosis saveDiagnosis(Diagnosis diagnosis) {
		System.out.println("inside Repo-----------" + diagnosis);
		return diagnosisRepository.save(diagnosis);
	}

	@Override
	public List<Diagnosis> getAllDiagnosis() {
		return diagnosisRepository.findAll();
	}

	@Override
	public Optional<Diagnosis> findByDiagnosisCode(String DiagnosisCode) {
		return diagnosisRepository.findByDiagnosisCode(DiagnosisCode);
	}

	@Override
	public Optional<Diagnosis> findByDiagnosisDescription(String DiagnosisDescription) {
		return diagnosisRepository.findByDiagnosisDescription(DiagnosisDescription);
	}
	@Override
	public ReportDto findBymeetingId(int meetingid) {
		// TODO Auto-generated method stub
		ReportDto reportDto = new ReportDto();
		reportDto.setPrescribedDiagnosis(prescribedDiagnosisrepo.findDiagnosisByMeeingId(meetingid));
		reportDto.setPrescribedMedication(prescribedmedicationrepo.findByMeetingid(meetingid));
		reportDto.setPrescribedProcedure(prescribedProcedurerepo.findProcedureByMeeingId(meetingid));
		
		return reportDto;
	}
}
