package com.example.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.PatientModel.PatientRegistrationDetails;
import com.example.Patientdao.PatientRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
class PatientRepositoryTest {
	@Autowired
	PatientRepository patientRepository;
	private PatientRegistrationDetails patientRegistrationDetails;
	
	@BeforeEach
	void setUp() throws Exception {
	}


//
//	@Test
//	public void testSavePatient() {
//		patientRepository.save(patientRegistrationDetails);
//
//
//		patientRepository.findByEmail(patientRegistrationDetails.getEmail());
//
//		assertEquals("abc@gmail.com", patientRegistrationDetails.getEmail());
//		
//	}
//	@Test
//	public void getAllPatientTest()  {
//		
//		
////		PatientRegistrationDetails patientRegistrationDetails = new PatientRegistrationDetails(1,"abc@gmail.com",1234567899,"qwerty",true,"2022-03-01");
////		PatientRegistrationDetails patientRegistrationDetails2 = new PatientRegistrationDetails(2,"eabc@gmail.com",1934567899,"qwerty",true,"2022-03-01");
////		PatientRegistrationDetails patientRegistrationDetails3 = new PatientRegistrationDetails(3,"eabc@gmail.com",1434567899,"qwerty",true,"2022-03-01");
//
//		patientRepository.save(patientRegistrationDetails);
////		patientRepository.save(patientRegistrationDetails2);
////		patientRepository.save(patientRegistrationDetails3);
//
//		  List<PatientRegistrationDetails> fetchedList = patientRepository.findAll();
//		  assertEquals(1, fetchedList.get(0).getPatient_id());	
//	}
	@Test
	void testFindByEmail() {
		PatientRegistrationDetails patientRegistrationDetails = new PatientRegistrationDetails();
		patientRegistrationDetails.setActive(true);
		patientRegistrationDetails.setDob("1995-07-05");
		patientRegistrationDetails.setDor("2022-04-24");
		patientRegistrationDetails.setEmail("ask@gmail.com");
		patientRegistrationDetails.setFirstname("avinash");
		patientRegistrationDetails.setLastname("kumar");
		patientRegistrationDetails.setPassword("qwerty123");
		patientRegistrationDetails.setPatient_id("PT001");
		patientRegistrationDetails.setRole("Patient");
		patientRegistrationDetails.setTitle("Mr");
		PatientRegistrationDetails Patient1= patientRepository.save(patientRegistrationDetails);
		patientRepository.findByEmail(Patient1.getEmail());
		assertEquals("ask@gmail.com",Patient1.getEmail());

//		PatientRegistrationDetails patient = new PatientRegistrationDetails(1,"abc@gmail.com",1234567899,"qwerty",true,"2022-03-01");
//	PatientRegistrationDetailss Patient1= patientRepository.save(patient);
//	patientRepository.getPatientByPatientemail(Patient1.getEmail());
//	assertEquals("abc@gmail.com",Patient1.getEmail());
	}
	@Test
	void testchangeStatusByEmailId() {
		PatientRegistrationDetails patientRegistrationDetails = new PatientRegistrationDetails();
		patientRegistrationDetails.setActive(true);
		patientRegistrationDetails.setDob("1995-07-05");
		patientRegistrationDetails.setDor("2022-04-24");
		patientRegistrationDetails.setEmail("ask1@gmail.com");
		patientRegistrationDetails.setFirstname("avinash");
		patientRegistrationDetails.setLastname("kumar");
		patientRegistrationDetails.setPassword("qwerty123");
		patientRegistrationDetails.setPatient_id("PT001");
		patientRegistrationDetails.setRole("Patient");
		patientRegistrationDetails.setTitle("Mr");
		PatientRegistrationDetails Patient1= patientRepository.save(patientRegistrationDetails);
		patientRepository.changeStatusByEmailId(Patient1.getEmail(),true);
		assertEquals(true,Patient1.isActive());
	}

	@Test
	void testresetpasswordEmailId() {
		PatientRegistrationDetails patientRegistrationDetails = new PatientRegistrationDetails();
		patientRegistrationDetails.setActive(true);
		patientRegistrationDetails.setDob("1995-07-05");
		patientRegistrationDetails.setDor("2022-04-24");
		patientRegistrationDetails.setEmail("ask2@gmail.com");
		patientRegistrationDetails.setFirstname("avinash");
		patientRegistrationDetails.setLastname("kumar");
		patientRegistrationDetails.setPassword("qwerty123");
		patientRegistrationDetails.setPatient_id("PT001");
		patientRegistrationDetails.setRole("Patient");
		patientRegistrationDetails.setTitle("Mr");
		PatientRegistrationDetails Patient1= patientRepository.save(patientRegistrationDetails);
		Integer Patient2= patientRepository.resetpasswordEmailId(patientRegistrationDetails.getEmail(),"cXdlcnR5MTIz");
//		patientRepository.changeStatusByEmailId(Patient1.getEmail(),true);
		assertEquals(1,Patient2);
	}
	@Test
	void countByActiveTest() {

		long Patient2= patientRepository.countByActive(true);
//		patientRepository.changeStatusByEmailId(Patient1.getEmail(),true);
		assertEquals(3,Patient2);
	}
//	@AfterEach
//	public void tearDown() {
//		patientRepository.deleteById("PT001");
//	}

}
