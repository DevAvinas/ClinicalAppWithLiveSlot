package com.example.PatientService;

import java.text.DecimalFormat;
import java.util.Base64;
import java.util.Base64.Encoder;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.example.PatientExceptions.PatientAlredyExistsException;
import com.example.PatientModel.PatientRegistrationDetails;
import com.example.PatientUtility.EmailService;
import com.example.Patientdao.PatientRepository;

@Service
public class PatientRegistrationServiceImpl implements PatientRegistrationService {

	@Autowired
	PatientRepository patientRepository;
	@Autowired
	private EmailService emailService;
	@Autowired
	private Environment env;

	@Override
	public PatientRegistrationDetails savePatient(PatientRegistrationDetails patientRegistrationDetails)
			throws PatientAlredyExistsException {
		// TODO Auto-generated method stub
		if (patientRepository.findByEmail(patientRegistrationDetails.getEmail()) != null) {
			throw new PatientAlredyExistsException("User Email exists in DB");
		} else {
			Encoder encoder = Base64.getEncoder();

			String encodedString = encoder.encodeToString(patientRegistrationDetails.getPassword().getBytes());

			patientRegistrationDetails.setPassword(encodedString);

			PatientRegistrationDetails response = patientRepository.save(patientRegistrationDetails);

			if (response != null) {
				emailService.sendMail(env.getProperty("reciever"), "Registration Successful !",
						"Hi,Welcome to CT General Hospital, NY. " + "Your login Id is: " + response.getEmail()
								+ " and your Patient Id is: " + response.getPatient_id());
			}
			return response;

		}

	}

	@Override
	public List<PatientRegistrationDetails> getAllPatients() {
		// TODO Auto-generated method stub
		return patientRepository.findAll();
	}

//	@Override
//	public PatientRegistrationDetails updatePatientdetail(PatientRegistrationDetails patient, String email) {
//		// TODO Auto-generated method stub
//
//		PatientRegistrationDetails pd = patientRepository.findByEmail(email);
//		pd.setPatient_id(patient.getPatient_id());
//		pd.setActive(patient.isActive());
//		pd.setDor(patient.getDor());
//		pd.setEmail(patient.getEmail());
//		pd.setPassword(patient.getPassword());
//		// pd.setPhone(patient.getPhone());
//
//		PatientRegistrationDetails pat = patientRepository.save(pd);
//		return pat;
//	}
//
//	@Override
//	public void deleteDetails(String patient_id) {
//		// TODO Auto-generated method stub
//		Optional<PatientRegistrationDetails> pd = patientRepository.findById(patient_id);
//		PatientRegistrationDetails p = pd.get();
//		patientRepository.delete(p);
//
//	}

	@Override
	public PatientRegistrationDetails findPatientByEmail(String email) {
		return patientRepository.findByEmail(email);
	}

	@Override
	public PatientRegistrationDetails findByEmailAndPassword(String usernameOrEmail, String password) {
		// TODO Auto-generated method stub
		Encoder encoder = Base64.getEncoder();

		password = encoder.encodeToString(password.getBytes());

		return patientRepository.findByEmailAndPassword(usernameOrEmail, password);
	}

	@Override
	public int changeStatusByEmailId(String email, String status) {
		// TODO Auto-generated method stub
		return patientRepository.changeStatusByEmailId(email, Boolean.parseBoolean(status));
	}

	@Override
	public PatientRegistrationDetails findById(String patientid) {
		// TODO Auto-generated method stub
		return patientRepository.findByPatientId(Integer.parseInt(patientid));
	}

	@Override
	public Integer resetpasswordEmailId(String email) {
		// TODO Auto-generated method stub

		Encoder encoder = Base64.getEncoder();
		String genPwd = new DecimalFormat("000000").format(new Random().nextInt(999999));
		String newpwd = encoder.encodeToString(genPwd.getBytes());
		emailService.sendMail(env.getProperty("reciever"), "CT General Hospital, NY",
				"Hi, Your password has been reset and your new password is: " + genPwd);
		return patientRepository.resetpasswordEmailId(email, newpwd);
	}

	@Override
	public PatientRegistrationDetails getByPatientid(String patientid) {
		// TODO Auto-generated method stub
		return patientRepository.findById(patientid).get();
	}

	@Override
	public long countOfPatients() {
		return patientRepository.countByActive(true);
	}

	@Override
	public Integer updatePasswoerd(String email, String newpassword) {
		// TODO Auto-generated method stub
		Encoder encoder = Base64.getEncoder();
		String newpwd = encoder.encodeToString(newpassword.getBytes());
		return patientRepository.resetpasswordEmailId(email, newpwd);
	}
}
