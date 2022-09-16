package com.citiustech.repo;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.DTO.PhysicianDTO;
import com.citiustech.model.Appointment;

@Repository
public interface ApptRepo extends JpaRepository<Appointment,Integer>{

	Appointment[] findByPhyIdAndApptDt(String email,Date apptDate);
	
	@Query(value="select * from appointment d where d.patient_id=?1 AND d.status=?2",nativeQuery = true)
	List<Appointment> PhysicianStatus(String patientid, String status);

	Appointment findByMeetId(int meetingid);
	
	Optional<Appointment[]> findByphyIdAndStatus(String phyid,String status);
	
	Appointment findBymeetId(int meetId);
	Appointment[] findByPhyIdAndStatus(String phyId, String status);
	
	Appointment[] findByPatientIdAndApptDt(String patId, Date apptDt);
	
	Appointment[] findBystatus(String status);
	@Query(value="select * from appointment d where (d.status) IN (?1) and d.patient_id=?2",nativeQuery = true)
	Appointment[] filterAppointment(String[] statuses, String patientid);
	
	Appointment[] findByPhyIdAndStatusAndApptType(String phyId, String status, String appttype);
	
}
