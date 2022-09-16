package com.example.PatientService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PatientModel.Address;
import com.example.Patientdao.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	AddressRepository addressRepository;
	@Override
	public Address save(Address address) {
		// TODO Auto-generated method stub
		return addressRepository.save(address);
	}

}
