package com.example.controller;

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

import com.example.PatientController.EmergencyDetailsController;
import com.example.PatientModel.PatientEmergencyDetails;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.EmergencyDetailsService;
import com.fasterxml.jackson.databind.ObjectMapper;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class EmergencyDetailsControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	private EmergencyDetailsService emergencyDetailsService;

	private PatientEmergencyDetails patientEmergencyDetails;


	private PatientRegistrationDetails patientRegistrationDetails;

	
	@InjectMocks
	private EmergencyDetailsController EmergencyDetailsController;
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
		patientEmergencyDetails=new PatientEmergencyDetails();
		patientEmergencyDetails.setAccess(false);
		patientEmergencyDetails.setDialcode("+91");
		patientEmergencyDetails.setEmail("avi@gmail.com");
		patientEmergencyDetails.setEmergency_details_id(1);
		patientEmergencyDetails.setFirst_name("Kapildeo");
		patientEmergencyDetails.setLast_name("Singh");
		patientEmergencyDetails.setPhone("9031694871");
		patientEmergencyDetails.setRelationship("Father");
		patientEmergencyDetails.setPatientRegistrationDetails(patientRegistrationDetails);
		mockMvc = MockMvcBuilders.standaloneSetup(EmergencyDetailsController).build();

	}
	@Test
	void testSaveDemo() throws Exception {
		when(emergencyDetailsService.save(any())).thenReturn(patientEmergencyDetails);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/private/savemergencydetails").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientEmergencyDetails))).andExpect(status().isCreated());
		verify(emergencyDetailsService).save(any());
		verify(emergencyDetailsService, times(1)).save(any());

	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}
