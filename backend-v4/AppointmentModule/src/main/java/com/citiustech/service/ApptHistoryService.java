package com.citiustech.service;

import java.util.List;

import com.citiustech.model.ApptEditHistory;

public interface ApptHistoryService {


	ApptEditHistory[] provNotificationsOfPhy(String phyId, String status, String reason);

	List<ApptEditHistory> getHistorytByMeetingId(int parseInt);


	List<ApptEditHistory> getApptByPatientId(String patientid);

	ApptEditHistory[] getApptByProviderId(String providerid);
}
