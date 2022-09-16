package com.example.ProviderService;

import java.util.List;

import com.example.DTO.VitalsDetailsDTO;
import com.example.ProviderModel.Upcomingappointments;
import com.example.ProviderModel.VitalsDetails;

public interface Providervitaldetailsservice {

	VitalsDetails saveDetails(VitalsDetails vitalsdetails);

	List<Upcomingappointments> getAllAppointments();

	VitalsDetails[] findBymeetingId(int meetingid);

	VitalsDetails findbymeetidandcheck(int meetingid);

}
