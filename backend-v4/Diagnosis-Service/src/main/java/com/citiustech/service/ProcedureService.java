package com.citiustech.service;

import java.util.List;
import java.util.Optional;


import com.citiustech.model.Procedure;

public interface ProcedureService {
	Procedure saveProcedure(Procedure procedure);

	List<Procedure> getAllProcedure();

	Optional<Procedure> findByProcedureCode(String ProcedureCode);
	Optional<Procedure> findByProcedureDescription(String ProcedureDescription);

}
