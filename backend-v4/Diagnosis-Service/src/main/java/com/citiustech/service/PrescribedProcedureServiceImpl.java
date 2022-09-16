package com.citiustech.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.model.PrescribedProcedure;

import com.citiustech.repository.PrescribedProcedurerepo;

@Service
public class PrescribedProcedureServiceImpl implements PrescribedProcedureservice {
	@Autowired
	PrescribedProcedurerepo prescribedProcedurerepo;

	@Override
	public PrescribedProcedure saveDetails(PrescribedProcedure prescribedProcedure) {
		// TODO Auto-generated method stub
		return prescribedProcedurerepo.save(prescribedProcedure);
	}

	@Override
	public List<PrescribedProcedure> getAllVitalsDetails() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrescribedProcedure updateUser(String id, PrescribedProcedure details) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrescribedProcedure delete(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PrescribedProcedure[] findProcedureByMeeingId(int meetingid) {
		return prescribedProcedurerepo.findProcedureByMeeingId(meetingid);
	}
}
