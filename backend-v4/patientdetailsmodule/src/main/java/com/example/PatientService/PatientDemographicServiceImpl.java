package com.example.PatientService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.PatientModel.PatientDemographicDetails;
import com.example.Patientdao.PatientDemographicDetailsRepository;

@Service
public class PatientDemographicServiceImpl implements PatientDemographicService {
	
	@Autowired
	PatientDemographicDetailsRepository patientDemographicDetailsRepository;
	@Override
	public PatientDemographicDetails savePatientDetails(PatientDemographicDetails patientDemographicDetails) {
		// TODO Auto-generated method stub
		return patientDemographicDetailsRepository.save(patientDemographicDetails);
	}
	
	@Override
	public PatientDemographicDetails checkDemoExists(String patient_id) {
		// TODO Auto-generated method stub
		return patientDemographicDetailsRepository.checkDemoExists(patient_id);
	}
	
	
//	@Override
//	public List<PatientDemographicDetails> getAllPatientDetails() {
//		// TODO Auto-generated method stub
//		return patientDemographicDetailsRepository.findAll();
//	}
	
//	@Override
//	public PatientDemographicDetails updateUser(String id, PatientDemographicDetails details) {
//	// TODO Auto-generated method stub
//	Optional<PatientDemographicDetails> temp = patientDemographicDetailsRepository.findById(id);
//
//	    PatientDemographicDetails detail = temp.get();
////	    detail.setPatient_details_id(details.getPatient_details_id());
////	    detail.setTitle(details.getTitle());
////	    detail.setFirst_name(details.getFirst_name());
////	    detail.setLast_name(details.getLast_name());
////	    details.setBirth_date(details.getBirth_date());
////	    details.setAge(details.getAge());
////	    details.setGender(details.getGender());
////	    details.setEmail(details.getEmail());
////	    details.setPhone(details.getPhone());
////	    details.setAddress(details.getAddress());
////	    details.setLanguage(details.getLanguage());
////	    details.setAllergyId(details.getAllergyId());
////	    details.setFatal(details.isFatal());
//		PatientDemographicDetails updatedDetail = patientDemographicDetailsRepository.save(detail);
////
//	    return updatedDetail;
//
//	}

//	@Override
//	public PatientDemographicDetails delete(String id) {
//	    PatientDemographicDetails temp = patientDemographicDetailsRepository.findById(id).orElse(null);
//	    if (temp != null) {
//	        patientDemographicDetailsRepository.deleteById(id);
//	        temp = patientDemographicDetailsRepository.findById(id).orElse(null);
//	    }
//	    return temp;
//
//	}
}
