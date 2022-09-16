package com.example.service;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Base64.Encoder;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.example.PatientExceptions.PatientAlredyExistsException;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientService.PatientRegistrationServiceImpl;
import com.example.PatientUtility.EmailService;
import com.example.Patientdao.PatientRepository;
@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
class PatientRegistrationServiceImplTest {
	@Autowired
	private MockMvc mockMvc;
	@Mock
	PatientRepository patientRepository;
	@Mock
	EmailService emailService;
	@Mock
	private Environment env;
//	PatientRegistrationDetails patientRegistrationDetails;
	@InjectMocks
	private PatientRegistrationServiceImpl patientRegistrationService;

	@Test
	void testSavePatient() throws Exception {
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

      when(patientRepository.save(any())).thenReturn(patientRegistrationDetails);  
      patientRegistrationService.savePatient(patientRegistrationDetails);
      patientRegistrationService.savePatient(patientRegistrationDetails);
      verify(patientRepository,times(2)).save(patientRegistrationDetails);
	}

	@Test
	void testGetAllPatients() {
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
		PatientRegistrationDetails patientRegistrationDetails2 = new PatientRegistrationDetails();
		patientRegistrationDetails2.setActive(true);
		patientRegistrationDetails2.setDob("1995-07-05");
		patientRegistrationDetails2.setDor("2022-04-24");
		patientRegistrationDetails2.setEmail("sb@gmail.com");
		patientRegistrationDetails2.setFirstname("avinash");
		patientRegistrationDetails2.setLastname("kumar");
		patientRegistrationDetails2.setPassword("qwerty123");
		patientRegistrationDetails2.setPatient_id("PT011");
		patientRegistrationDetails2.setRole("Patient");
		patientRegistrationDetails2.setTitle("Mr");	
		
		patientRepository.save(patientRegistrationDetails);
		patientRepository.save(patientRegistrationDetails2);
		
		List<PatientRegistrationDetails> clist = new ArrayList<>();
		clist.add(patientRegistrationDetails);
		clist.add(patientRegistrationDetails2);
		
		when(patientRepository.findAll()).thenReturn(clist);
		List<PatientRegistrationDetails> temp = patientRegistrationService.getAllPatients();
		assertEquals(clist, temp);
		verify(patientRepository,times(1)).save(patientRegistrationDetails);
		verify(patientRepository,times(1)).findAll();
	}

//	@Test
//	void testUpdatePatientdetail() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testDeleteDetails() {
//		fail("Not yet implemented");
//	}

	@Test
	void testFindPatientByEmail() throws Exception {
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
	      when(patientRepository.findByEmail("avi@gmail.com")).thenReturn(patientRegistrationDetails);  
	      patientRegistrationService.findPatientByEmail("avi@gmail.com");
	      patientRegistrationService.findPatientByEmail("avi@gmail.com");
	      verify(patientRepository,times(2)).findByEmail("avi@gmail.com");
	}

	@Test
	void testFindByEmailAndPassword() {
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
	      when(patientRepository.findByEmailAndPassword("avi@gmail.com","cXdlcnR5MTIz")).thenReturn(patientRegistrationDetails);  
	      patientRegistrationService.findByEmailAndPassword("avi@gmail.com","qwerty123");
	      patientRegistrationService.findByEmailAndPassword("avi@gmail.com","qwerty123");
	      verify(patientRepository,times(2)).findByEmailAndPassword("avi@gmail.com","cXdlcnR5MTIz");
	}

	@Test
	void testChangeStatusByEmailId() {
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
	      when(patientRepository.changeStatusByEmailId("avi@gmail.com",true)).thenReturn(1);  
	      patientRegistrationService.changeStatusByEmailId("avi@gmail.com","true");
	      patientRegistrationService.changeStatusByEmailId("avi@gmail.com","true");
	      verify(patientRepository,times(2)).changeStatusByEmailId("avi@gmail.com",true);
	}

	@Test
	void testFindById() {
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
        Optional<PatientRegistrationDetails> optionalpatientRegistrationDetails = Optional.of(patientRegistrationDetails);


	      when(patientRepository.findByPatientId(1)).thenReturn(patientRegistrationDetails);  
	      patientRegistrationService.findById("1");
	      patientRegistrationService.findById("1");
	      verify(patientRepository,times(2)).findByPatientId(1);
	}

//	@Test
//	void testResetpasswordEmailId() {
//		String genPwd = new DecimalFormat("000000").format(new Random().nextInt(999999));
//		Encoder encoder = Base64.getEncoder();
//		String newpwd = encoder.encodeToString(genPwd.getBytes());
//		when(encoder.encodeToString(genPwd.getBytes())).thenReturn(newpwd); 
//	      when(patientRepository.resetpasswordEmailId("avi@gmail.com",newpwd)).thenReturn(0);  
//	      patientRegistrationService.resetpasswordEmailId("avi@gmail.com");
//	      patientRegistrationService.resetpasswordEmailId("avi@gmail.com");
//	      verify(patientRepository,times(2)).resetpasswordEmailId("avi@gmail.com",genPwd);
//	}

	@Test
	void testGetByPatientid() throws Exception {
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
        Optional<PatientRegistrationDetails> optionalpatientRegistrationDetails = Optional.of(patientRegistrationDetails);

      when(patientRepository.findById("PT010")).thenReturn(optionalpatientRegistrationDetails);  
      patientRegistrationService.getByPatientid("PT010");
      patientRegistrationService.getByPatientid("PT010");
      verify(patientRepository,times(2)).findById("PT010");
	}

	@Test
	void testCountOfPatients() {

	      when(patientRepository.countByActive(true)).thenReturn(0L);  
	      patientRegistrationService.countOfPatients();
	      patientRegistrationService.countOfPatients();
	      verify(patientRepository,times(2)).countByActive(true);
	}

	@Test
	void testUpdatePasswoerd() {
	      when(patientRepository.resetpasswordEmailId("avi@gmail.com", "cXdlcnR5MTIz")).thenReturn(1);  
	      patientRegistrationService.updatePasswoerd("avi@gmail.com", "qwerty123");
	      patientRegistrationService.updatePasswoerd("avi@gmail.com", "qwerty123");
	      verify(patientRepository,times(2)).resetpasswordEmailId("avi@gmail.com", "cXdlcnR5MTIz");
	}

}
