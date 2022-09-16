package com.example.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
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
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.example.PatientController.PatientController;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientRegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class PatientControllerTest  {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	private PatientRegistrationService patientRegistrationService;
	private PatientRegistrationDetails patientRegistrationDetails;
	private List<PatientRegistrationDetails> patientRegistrationDetailsList;
	
	@InjectMocks
	private PatientController patientController;
	
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
		mockMvc = MockMvcBuilders.standaloneSetup(patientController).build();

	}

//	@AfterEach
//	void tearDown() throws Exception {
//	}

//	@Test
//	void testSavePatientRegistration() throws Exception {
//		when(patientRegistrationService.savePatient(any())).thenReturn(patientRegistrationDetails);
//		mockMvc.perform(
//				post("api/private").contentType(MediaType.APPLICATION_JSON).content(asJsonString(patientRegistrationDetails)))
//				.andExpect(status().isCreated());
//		verify(patientRegistrationService, times(1)).savePatient(any());
////		assertEquals(3, 3);
//
//	}
	@Test
	void getAllPatientRegistration() throws Exception {
		when(patientRegistrationService.getAllPatients()).thenReturn(patientRegistrationDetailsList);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/private/allpatient").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).getAllPatients();
		verify(patientRegistrationService, times(1)).getAllPatients();
//		assertEquals(3, 3);
	}
	@Test
	void findPatientByEmailId() throws Exception {
		when(patientRegistrationService.findPatientByEmail(any())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/private/findbyemail/avi@gmail.com").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).findPatientByEmail(any());
		verify(patientRegistrationService, times(1)).findPatientByEmail(any());
//		assertEquals(3, 3);
	}
	@Test
	void getbyPatientId() throws Exception {
		when(patientRegistrationService.getByPatientid(anyString())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/private/getbypatientid/PT010").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).getByPatientid(any());
		verify(patientRegistrationService, times(1)).getByPatientid(any());
//		assertEquals(3, 3);
	}
	@Test
	void countOfPatients() throws Exception {
		when(patientRegistrationService.countOfPatients()).thenReturn(0L);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/private/countOfPatients").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).countOfPatients();
		verify(patientRegistrationService, times(1)).countOfPatients();
//		assertEquals(3, 3);
	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

}
