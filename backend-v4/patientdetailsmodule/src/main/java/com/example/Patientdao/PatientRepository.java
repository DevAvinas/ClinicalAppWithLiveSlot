package com.example.Patientdao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.PatientModel.PatientRegistrationDetails;

@Repository
public interface PatientRepository extends JpaRepository<PatientRegistrationDetails, String> {
	PatientRegistrationDetails findByEmail(String email);

	public PatientRegistrationDetails findByEmailAndPassword(String email, String password);

	@Transactional
	@Modifying
	@Query(value = "UPDATE patient_registration_details SET active = ?2 WHERE email =?1", nativeQuery = true)
	int changeStatusByEmailId(String email, boolean status);

	@Query(value = "select * from patient_registration_details where patient_id=(select patient_id from appointment where meet_id=?1)", nativeQuery = true)
	PatientRegistrationDetails findByPatientId(int patientid);

	@Transactional
	@Modifying
	@Query(value = "UPDATE patient_registration_details SET password = ?2 WHERE email =?1", nativeQuery = true)

	Integer resetpasswordEmailId(String email, String newpwd);
	long countByActive(boolean active);

}
