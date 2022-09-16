package com.citiustech.service;

import java.util.List;
import java.util.Optional;

import com.citiustech.DTO.ReportDto;
import com.citiustech.model.Diagnosis;

public interface DiagnosisService {
	Diagnosis saveDiagnosis(Diagnosis diagnosis);

	List<Diagnosis> getAllDiagnosis();

	Optional<Diagnosis> findByDiagnosisCode(String DiagnosisCode);
	Optional<Diagnosis> findByDiagnosisDescription(String DiagnosisDescription);

	ReportDto findBymeetingId(int meetingid);

}
