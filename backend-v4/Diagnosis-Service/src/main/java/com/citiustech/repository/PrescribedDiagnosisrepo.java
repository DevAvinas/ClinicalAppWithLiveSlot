package com.citiustech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.model.PrescribedDiagnosis;

@Repository
public interface PrescribedDiagnosisrepo extends JpaRepository<PrescribedDiagnosis, String> {
	@Query(value ="select * from prescribeddiagnosis where meeting_id=?1",nativeQuery = true)
	PrescribedDiagnosis[] findDiagnosisByMeeingId(int meetingid);
}
