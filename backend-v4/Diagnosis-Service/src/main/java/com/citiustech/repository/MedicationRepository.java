package com.citiustech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.model.Diagnosis;
import com.citiustech.model.Medication;
import com.citiustech.model.Procedure;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, String> {

	Optional<Medication> findById(String drug_id);
	@Query(value = "SELECT * FROM Medication WHERE drug_name=?1", nativeQuery = true)
	Optional<Medication> findBydrug_name(String drug_name);
}
