export interface AppointmentEditHistory {
    history_id:  string;
    meetId:      number;
    description: string;
    phyId:       string;
    apptDt:      string;
    apptFrTime:  string;
    apptToTime:  string;
    reason:      string;
    status:      string;
    patientId:   string;
    changedbyId: string;
    patientname: string;
    phyname:     string;
    modifiedTs:  string;
}