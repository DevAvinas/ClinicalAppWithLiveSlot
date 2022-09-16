package com.citiustech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.model.PrescribedProcedure;

@Repository
public interface PrescribedProcedurerepo extends JpaRepository<PrescribedProcedure, String> {
	@Query(value ="select * from prescribedprocedure where meeting_id=?1",nativeQuery = true)
	PrescribedProcedure[] findProcedureByMeeingId(int meetingid);
}
