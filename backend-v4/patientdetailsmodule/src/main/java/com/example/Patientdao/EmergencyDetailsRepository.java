package com.example.Patientdao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.PatientModel.PatientEmergencyDetails;
@Repository
public interface EmergencyDetailsRepository extends JpaRepository<PatientEmergencyDetails,Integer>{

}
