package com.example.Patientdao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.PatientModel.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address,Integer>{
	
	

}
