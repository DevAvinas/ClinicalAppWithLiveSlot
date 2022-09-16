package com.example.controller;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

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

import com.example.PatientController.PatientDemographicDetailsController;
import com.example.PatientModel.PatientDemographicDetails;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientDemographicService;
import com.fasterxml.jackson.databind.ObjectMapper;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class PatientDemographicDetailsControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	private PatientDemographicService patientDemographicServiceImpl;
	private PatientDemographicDetails detail;
	private PatientRegistrationDetails patientRegistrationDetails;
	private List<PatientDemographicDetails> patientDemographicDetailsList;
	
	@InjectMocks
	private PatientDemographicDetailsController patientDemographicDetailsController;
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
		detail = new PatientDemographicDetails();
		detail.setAge("26");
		detail.setAllergyId(null);
		detail.setContact("8339048250");
		detail.setDialCode("+91");
		detail.setDob("1995-07-05");
		detail.setEthnicity("Indian");
		detail.setFatal(false);
		detail.setGender("Male");
		detail.setLanguage("Hindi");
		detail.setPatient_details_id(1);
		detail.setPatientRegistrationDetails(patientRegistrationDetails);
		mockMvc = MockMvcBuilders.standaloneSetup(patientDemographicDetailsController).build();

	}
	@Test
	void testCheckDemoExists() throws Exception {
		when(patientDemographicServiceImpl.checkDemoExists(any())).thenReturn(detail);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/private/checkDemo/PT010").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(detail))).andExpect(status().isOk());
		verify(patientDemographicServiceImpl).checkDemoExists(any());
		verify(patientDemographicServiceImpl, times(1)).checkDemoExists(any());

	}

	@Test
	void testSaveDemo() throws Exception {
		when(patientDemographicServiceImpl.savePatientDetails(any())).thenReturn(detail);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/private/savedemo").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(detail))).andExpect(status().isCreated());
		verify(patientDemographicServiceImpl).savePatientDetails(any());
		verify(patientDemographicServiceImpl, times(1)).savePatientDetails(any());

	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}
