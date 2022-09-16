package com.example.ProviderService;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Base64.Encoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ProviderExceptions.ProviderAlreadyExits;
import com.example.ProviderModel.ProviderOtp;
import com.example.ProviderModel.ProviderRegistration;
import com.example.ProviderModel.VitalsDetails;
import com.example.ProviderRepo.ProviderOtpRepo;
import com.example.ProviderRepo.ProviderRepository;

@Service
public class RegistrationService implements ProviderRegistrationService {
	@Autowired
	ProviderRepository providerRepository;

	@Autowired
	ProviderOtpRepo otpRepo;

	@Override
    public ProviderRegistration savePatient(ProviderRegistration providerRegistration) throws ProviderAlreadyExits {
        if (providerRepository.findByEmail(providerRegistration.getEmail()) != null) {
            throw new ProviderAlreadyExits("User Email exists in DB");
        }
        else {
                Encoder encoder = Base64.getEncoder();
                String encodedString = encoder.encodeToString(providerRegistration.getPassword().getBytes());
                providerRegistration.setPassword(encodedString);
 
        }
		return providerRepository.save(providerRegistration);
        }
	@Override
	public List<ProviderRegistration> getAllPatients() {
		return providerRepository.findAll();
	}

	@Override
	public ProviderRegistration updatePatientdetail(ProviderRegistration provider, String email) {
		ProviderRegistration pd = providerRepository.findByEmail(email);
		pd.setProvider_id(provider.getProvider_id());
		pd.setFirstname(provider.getFirstname());
		pd.setLastname(provider.getLastname());
		pd.setDob(provider.getDob());
		pd.setEmail(provider.getEmail());
		pd.setRole(provider.getRole());
		pd.setTitle(provider.getTitle());

		ProviderRegistration pat = providerRepository.save(pd);
		return pat;
	}

	@Override
	public void deleteDetails(String patient_id) {
		// TODO Auto-generated method stub
		Optional<ProviderRegistration> pd = providerRepository.findById(patient_id);
		ProviderRegistration p = pd.get();
		providerRepository.delete(p);

	}

	@Override
	public ProviderRegistration findPatientByEmail(String email) {
		return providerRepository.findByEmail(email);
	}

	@Override
	public ProviderRegistration findByEmailAndPassword(String email, String password) {
		Encoder encoder = Base64.getEncoder();
		String encodedString = encoder.encodeToString(password.getBytes());
		return providerRepository.findByEmailAndPassword(email, encodedString);
	}

	@Override
	public List<ProviderRegistration> allphysicians() {
		// TODO Auto-generated method stub
		return providerRepository.findByRole("Doctor");
	}

	@Override
	public ProviderRegistration[] filterPhysician(String[] phyid) {
		// TODO Auto-generated method stub
		return providerRepository.filterPhysician(phyid);
	}

	@Override
	public ProviderRegistration getByProviderid(String providerid) {
		// TODO Auto-generated method stub
		return providerRepository.findById(providerid).get();
	}

	@Override
	public Integer changeStatusByEmailId(String email, String status) {
		// TODO Auto-generated method stub
		return providerRepository.changeStatusByEmailId(email, Boolean.parseBoolean(status));
	}

	@Override
	public ProviderOtp checkProviderOtp(String usernameOrEmail, String otp) {
		ProviderOtp[] otpArr = otpRepo.findByEmailAndOtpAndStatus(usernameOrEmail, otp, "Active");
		if (otpArr.length > 0)
			return otpArr[0];
		else
			return null;
	}

	@Override
	public ProviderOtp createProviderOtp(String email) {
		// Deleting Old OTP
		ProviderOtp[] oldOtp = otpRepo.findByEmailAndStatus(email, "Active");
		if (oldOtp.length != 0) {
			otpRepo.delete(oldOtp[0]);
		}

		// Creating New OTP
		ProviderOtp newOtp = new ProviderOtp();
		newOtp.setEmail(email);
		newOtp.setStatus("Active");
		newOtp.setValidity(LocalDateTime.now().plusMinutes(50));

		Random r = new Random();
		String otp = "";
		String alphabet = "108ctgh";
		for (int i = 0; i < 8; i++) {
			otp += (alphabet.charAt(r.nextInt(alphabet.length())));
		}
		System.out.println("OTP Generated: " + otp);
		newOtp.setOtp(otp);

		return otpRepo.save(newOtp);
	}

	@Override
	public ProviderRegistration resetProviderPassword(String usernameOrEmail, String password) {
		ProviderRegistration tempUser = providerRepository.findByEmail(usernameOrEmail);
		Encoder encoder = Base64.getEncoder();
		String encodedString = encoder.encodeToString(password.getBytes());
		tempUser.setPassword(encodedString);
		tempUser.setOtpFlag(false);
		return providerRepository.save(tempUser);
	}

	@Override
	public void deleteOtp(String usernameOrEmail) {
		ProviderOtp[] oldOtpArr = otpRepo.findByEmailAndStatus(usernameOrEmail, "Active");
		if (oldOtpArr.length > 0) {
			if (oldOtpArr[0] != null) {
				otpRepo.delete(oldOtpArr[0]);
			}
		}

	}

	@Override
	public ProviderRegistration adminResetPassword(String email) {
		ProviderRegistration tempUser = providerRepository.findByEmail(email);
		tempUser.setOtpFlag(true);
		tempUser.setPassword(null);
		return providerRepository.save(tempUser);
	}

	@Override
	public long countByRole(String role) {
		return providerRepository.countByRoleAndByActive(role, true);
	}

}
