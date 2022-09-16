package com.example.ProviderService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ProviderModel.Upcomingappointments;
import com.example.ProviderModel.VitalsDetails;
import com.example.ProviderRepo.ProviderVitalsRepo;
import com.example.ProviderRepo.UpcomingAppointments;

@Service
public class ProviderVitalDetailsServiceImpl implements Providervitaldetailsservice {

	@Autowired
	ProviderVitalsRepo providerrepo;

	@Autowired
	UpcomingAppointments upcominapprepo;

	@Override
	public VitalsDetails saveDetails(VitalsDetails vitalsdetails) {

		// TODO Auto-generated method stub

		return providerrepo.save(vitalsdetails);

	}

	@Override
	public List<Upcomingappointments> getAllAppointments() {
		// TODO Auto-generated method stub
		return upcominapprepo.findAll();
	}

	@Override
	public VitalsDetails[] findBymeetingId(int meetingid) {
		// TODO Auto-generated method stub
		return providerrepo.findByMeetingid(meetingid);
	}

	@Override
	public VitalsDetails findbymeetidandcheck(int meetingid) {
		// TODO Auto-generated method stub
		Optional<VitalsDetails> vital = Optional.of(providerrepo.findbymeetingid(meetingid));
		if (vital == null) {
			System.out.println("no vitals");
		}
		return providerrepo.findbymeetingid(meetingid);

	}

}
