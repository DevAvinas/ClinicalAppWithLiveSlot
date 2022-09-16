package com.example.ProviderService;

import java.util.List;

import com.example.ProviderExceptions.ProviderAlreadyExits;
import com.example.ProviderModel.ProviderOtp;
import com.example.ProviderModel.ProviderRegistration;

public interface ProviderRegistrationService {

	ProviderRegistration savePatient(ProviderRegistration patientRegistrationDetails) throws ProviderAlreadyExits;

	List<ProviderRegistration> getAllPatients();

	ProviderRegistration updatePatientdetail(ProviderRegistration patient, String email);

	void deleteDetails(String patient_id);

	public ProviderRegistration findPatientByEmail(String email);

	ProviderRegistration findByEmailAndPassword(String usernameOrEmail, String password);

	List<ProviderRegistration> allphysicians();

	ProviderRegistration[] filterPhysician(String[] phyid);

	Integer changeStatusByEmailId(String email, String status);

	ProviderOtp checkProviderOtp(String usernameOrEmail, String otp);

	ProviderOtp createProviderOtp(String email);

	ProviderRegistration resetProviderPassword(String usernameOrEmail, String password);

	void deleteOtp(String usernameOrEmail);

	ProviderRegistration adminResetPassword(String email);

	long countByRole(String role);

	ProviderRegistration getByProviderid(String providerid);

}
