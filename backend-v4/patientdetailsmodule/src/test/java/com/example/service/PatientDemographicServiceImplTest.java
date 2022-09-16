package com.example.service;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
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

import com.example.PatientModel.PatientDemographicDetails;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientDemographicServiceImpl;
import com.example.Patientdao.PatientDemographicDetailsRepository;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class PatientDemographicServiceImplTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	PatientDemographicDetailsRepository patientDemographicDetailsRepository;
	
	@InjectMocks
	private PatientDemographicServiceImpl patientDemographicServiceImpl;
	
	@Test
	void testSavePatientDetails() {
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
		PatientDemographicDetails detail = new PatientDemographicDetails();

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
		
	      when(patientDemographicDetailsRepository.save(detail)).thenReturn(detail);  
	      patientDemographicServiceImpl.savePatientDetails(detail);
	      patientDemographicServiceImpl.savePatientDetails(detail);
	      verify(patientDemographicDetailsRepository,times(2)).save(detail);
	}

	@Test
	void testCheckDemoExists() {
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
		PatientDemographicDetails detail = new PatientDemographicDetails();

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
		
	      when(patientDemographicDetailsRepository.checkDemoExists("PT010")).thenReturn(detail);  
	      patientDemographicServiceImpl.checkDemoExists("PT010");
	      patientDemographicServiceImpl.checkDemoExists("PT010");
	      verify(patientDemographicDetailsRepository,times(2)).checkDemoExists("PT010");
	}

//	@Test
//	void testGetAllPatientDetails() {
//		fail("Not yet implemented");
//	}

//	@Test
//	void testUpdateUser() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testDelete() {
//		fail("Not yet implemented");
//	}

}
