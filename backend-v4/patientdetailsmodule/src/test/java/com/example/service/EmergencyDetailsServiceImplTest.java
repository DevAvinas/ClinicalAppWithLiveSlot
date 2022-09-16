package com.example.service;

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

import com.example.PatientModel.PatientEmergencyDetails;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.EmergencyDetailsServiceImpl;
import com.example.Patientdao.EmergencyDetailsRepository;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)


class EmergencyDetailsServiceImplTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	EmergencyDetailsRepository emergencyDetailsRepository;
	
	@InjectMocks
	private EmergencyDetailsServiceImpl emergencyDetailsServiceImpl;
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
		PatientEmergencyDetails patientEmergencyDetails=new PatientEmergencyDetails();
		patientEmergencyDetails.setAccess(false);
		patientEmergencyDetails.setDialcode("+91");
		patientEmergencyDetails.setEmail("avi@gmail.com");
		patientEmergencyDetails.setEmergency_details_id(1);
		patientEmergencyDetails.setFirst_name("Kapildeo");
		patientEmergencyDetails.setLast_name("Singh");
		patientEmergencyDetails.setPhone("9031694871");
		patientEmergencyDetails.setRelationship("Father");
		patientEmergencyDetails.setPatientRegistrationDetails(patientRegistrationDetails);
		
	      when(emergencyDetailsRepository.save(patientEmergencyDetails)).thenReturn(patientEmergencyDetails);  
	      emergencyDetailsServiceImpl.save(patientEmergencyDetails);
	      emergencyDetailsServiceImpl.save(patientEmergencyDetails);
	      verify(emergencyDetailsRepository,times(2)).save(patientEmergencyDetails);
	}

}
