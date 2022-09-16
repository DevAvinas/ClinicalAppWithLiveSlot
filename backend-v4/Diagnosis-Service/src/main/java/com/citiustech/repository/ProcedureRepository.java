package com.citiustech.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.model.Procedure;

@Repository
public interface ProcedureRepository extends JpaRepository<Procedure, String> {
	Optional<Procedure> findByProcedureCode(String ProcedureCode);

	Optional<Procedure> findByProcedureDescription(String ProcedureDescription);
}
