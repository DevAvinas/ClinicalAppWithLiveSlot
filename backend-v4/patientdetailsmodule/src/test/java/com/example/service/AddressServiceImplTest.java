package com.example.service;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.example.PatientModel.Address;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.AddressServiceImpl;
import com.example.Patientdao.AddressRepository;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class AddressServiceImplTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	AddressRepository addressRepository;
	
	@InjectMocks
	private AddressServiceImpl addressServiceImpl;
	@Test
	void testSave() {
		PatientRegistrationDetails patientRegistrationDetails = new PatientRegistrationDetails();
		patientRegistrationDetails.setActive(true);
		patientRegistrationDetails.setDob("1995-07-05");
		patientRegistrationDetails.setDor("2022-04-24");
		patientRegistrationDetails.setEmail("avi@gmail.com");
		patientRegistrationDetails.setFirstname("avinash");
		patientRegistrationDetails.setLastname("kumar");
		patientRegistrationDetails.setPassword("qwerty123");
		patientRegistrationDetails.setPatient_id("PT010");
		patientRegistrationDetails.setRole("Patient");
		patientRegistrationDetails.setTitle("Mr");
		Address address=new Address();
		address.setAddress_type("self");
		address.setAddressId(1);
		address.setCity("Dhanbad");
		address.setCountry("India");
		address.setLine1("street");
		address.setLine2("road");
		address.setPostalcode("828109");
		address.setState("Jharkhand");
		address.setPatientRegistrationDetails(patientRegistrationDetails);
	      when(addressRepository.save(address)).thenReturn(address);  
	      addressServiceImpl.save(address);
	      addressServiceImpl.save(address);
	      verify(addressRepository,times(2)).save(address);
	}

}
