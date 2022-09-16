package com.example.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.PatientController.AddressController;
import com.example.PatientController.EmergencyDetailsController;
import com.example.PatientModel.Address;
import com.example.PatientModel.PatientEmergencyDetails;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.AddressService;
import com.example.PatientService.EmergencyDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class AddressControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	private AddressService AddressService;
	private Address address;
	@InjectMocks
	private AddressController AddressController;
	@BeforeEach
	void setUp() throws Exception {
		patientRegistrationDetails = new PatientRegistrationDetails();
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
		address=new Address();
		address.setAddress_type("self");
		address.setAddressId(1);
		address.setCity("Dhanbad");
		address.setCountry("India");
		address.setLine1("street");
		address.setLine2("road");
		address.setPostalcode("828109");
		address.setState("Jharkhand");
		address.setPatientRegistrationDetails(patientRegistrationDetails);
		mockMvc = MockMvcBuilders.standaloneSetup(AddressController).build();

	}

	private PatientRegistrationDetails patientRegistrationDetails;
	@Test
	void testSaveDemo() throws Exception {
		when(AddressService.save(any())).thenReturn(address);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/private/saveaddress").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(address))).andExpect(status().isCreated());
		verify(AddressService).save(any());
		verify(AddressService, times(1)).save(any());

	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}
