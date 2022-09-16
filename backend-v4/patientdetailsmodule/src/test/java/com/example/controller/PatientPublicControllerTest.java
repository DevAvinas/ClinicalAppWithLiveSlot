package com.example.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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

import com.example.DTO.LoginDTO;
import com.example.DTO.ResetPasswordDTO;
import com.example.PatientController.PatientPublicController;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientRegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class PatientPublicControllerTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	private PatientRegistrationService patientRegistrationService;
	private PatientRegistrationDetails patientRegistrationDetails;
	private List<PatientRegistrationDetails> patientRegistrationDetailsList;
	private LoginDTO logindto;
	private ResetPasswordDTO resetPasswordDTO;
	@InjectMocks
	private PatientPublicController patientController;
	
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
		logindto=new LoginDTO();
		logindto.setPassword("qwerty123");
		logindto.setUsernameOrEmail("avi@gmail.com");
		resetPasswordDTO=new ResetPasswordDTO();
		resetPasswordDTO.setEmail("avi@gmail.com");
		resetPasswordDTO.setOldpassword("qwerty123");
		resetPasswordDTO.setNewpassword("qwerty12");

		mockMvc = MockMvcBuilders.standaloneSetup(patientController).build();

	}


	@Test
	void testSaveBook() throws Exception {
		when(patientRegistrationService.savePatient(any())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(
				post("/api/public/register").contentType(MediaType.APPLICATION_JSON).content(asJsonString(patientRegistrationDetails)))
				.andExpect(status().isCreated());
		verify(patientRegistrationService, times(1)).savePatient(any());
//		assertEquals(3, 3);
	}

	@Test
	void testLogin() throws Exception {
		when(patientRegistrationService.findByEmailAndPassword(any(),any())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(
				post("/api/public/login").contentType(MediaType.APPLICATION_JSON).content(asJsonString(patientRegistrationDetails)))
				.andExpect(status().isOk());
		verify(patientRegistrationService, times(1)).findByEmailAndPassword(any(),any());

	}

	@Test
	void testFindPatientByEmailId() throws Exception {
		when(patientRegistrationService.findPatientByEmail(any())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/public/findbyemail/avi@gmail.com").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).findPatientByEmail(any());
		verify(patientRegistrationService, times(1)).findPatientByEmail(any());

	}

	@Test
	void testChangeStatusByEmailId() throws Exception {
		when(patientRegistrationService.changeStatusByEmailId(any(),any())).thenReturn(0);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/public/changestatus/avi@gmail.com/true").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).changeStatusByEmailId(any(),any());
		verify(patientRegistrationService, times(1)).changeStatusByEmailId(any(),any());

	}

	@Test
	void testFindById() throws Exception {
		when(patientRegistrationService.findById(anyString())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(MockMvcRequestBuilders.get("/api/public/findbyId/PT010").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).findById(any());
		verify(patientRegistrationService, times(1)).findById(any());

	}

//	@Test
//	void testSendmail() {
//		fail("Not yet implemented");
//	}

	@Test
	void testResetpasswordEmailId() throws Exception {
		when(patientRegistrationService.resetpasswordEmailId(any())).thenReturn(anyInt());
		mockMvc.perform(MockMvcRequestBuilders.get("/api/public/resetpassword/avi@gmail.com").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).resetpasswordEmailId(any());
		verify(patientRegistrationService, times(1)).resetpasswordEmailId(any());

	}

	@Test
	void testUpdatepassword() throws Exception {
		when(patientRegistrationService.findByEmailAndPassword(any(),any())).thenReturn(patientRegistrationDetails);
		mockMvc.perform(MockMvcRequestBuilders.post("/api/public/updatepassword").contentType(MediaType.APPLICATION_JSON)
				.content(asJsonString(patientRegistrationDetails))).andExpect(status().isOk());
		verify(patientRegistrationService).findByEmailAndPassword(any(),any());
		verify(patientRegistrationService, times(1)).findByEmailAndPassword(any(),any());

	}
	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}
