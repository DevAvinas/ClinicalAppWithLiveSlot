package com.citiustech.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.model.ApptEditHistory;

@Repository
public interface AppointmentHistoryRepo extends JpaRepository<ApptEditHistory,Integer> {

	ApptEditHistory[] findByPhyIdAndStatusOrReason(String phyId,String status,String reason);
		
	List<ApptEditHistory> findByMeetId(int meetingid);

	List<ApptEditHistory> findByPatientId(String patientid);
	
	ApptEditHistory[] findByPhyId(String phyid);
}

