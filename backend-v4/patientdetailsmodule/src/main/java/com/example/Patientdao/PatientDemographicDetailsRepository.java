package com.example.Patientdao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.PatientModel.PatientDemographicDetails;

@Repository
public interface PatientDemographicDetailsRepository extends JpaRepository<PatientDemographicDetails,String>{

	@Query("select d from PatientDemographicDetails d where patientRegistrationDetails.patient_id=?1")
	PatientDemographicDetails checkDemoExists(String patient_id);

}


