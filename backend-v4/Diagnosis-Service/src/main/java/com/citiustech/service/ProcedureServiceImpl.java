package com.citiustech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.Procedure;

import com.citiustech.repository.ProcedureRepository;

@Service
public class ProcedureServiceImpl implements ProcedureService {
	@Autowired
	ProcedureRepository procedureRepository;

	@Override
	public Procedure saveProcedure(Procedure procedure) {
		System.out.println("inside Repo-----------" + procedure);
		return procedureRepository.save(procedure);
	}

	@Override
	public List<Procedure> getAllProcedure() {
		return procedureRepository.findAll();
	}

	@Override
	public Optional<Procedure> findByProcedureCode(String ProcedureCode) {
		return procedureRepository.findByProcedureCode(ProcedureCode);
	}

	@Override
	public Optional<Procedure> findByProcedureDescription(String ProcedureDescription) {
		return procedureRepository.findByProcedureDescription(ProcedureDescription);
	}

}
