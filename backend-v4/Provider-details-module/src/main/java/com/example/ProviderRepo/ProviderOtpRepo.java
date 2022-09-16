package com.example.ProviderRepo;




	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;

	import com.example.ProviderModel.ProviderOtp;

	@Repository
	public interface ProviderOtpRepo extends JpaRepository<ProviderOtp, Integer>{

	 ProviderOtp[] findByEmailAndOtpAndStatus(String email,String otp,String status);
	ProviderOtp[] findByEmailAndStatus(String email,String status);
	}

