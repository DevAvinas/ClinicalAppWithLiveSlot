package com.example.ProviderRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.ProviderModel.VitalsDetails;

@Repository
public interface ProviderVitalsRepo extends JpaRepository<VitalsDetails,String> {

	VitalsDetails[] findByMeetingid(int meetingid);
	
	@Query(value = "SELECT * FROM VitalsDetails WHERE meetingid=?1", nativeQuery = true)
	VitalsDetails findbymeetingid(int meetingid);
	
}
