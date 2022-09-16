package com.citiustech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.model.Diagnosis;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, String> {
	Optional<Diagnosis> findByDiagnosisCode(String DiagnosisCode);
	Optional<Diagnosis> findByDiagnosisDescription(String DiagnosisDescription);

}
