export class AppointmentRequests {
    meetId: number;
    meetingTitle: string;
    description: string;
    phyId: string;
     phyname:string;
    apptDt: string;
    apptFrTime: string;
    apptToTime: string;
    apptType: string;
    reason: string;
    status: string;
    patientId: string;
     patientname:string;
    changedbyId:string;
    // creationDt: string;

    constructor() {
        this.meetId;
        this.meetingTitle= "";
        this.description= "";
        this.phyId= "";
        this.phyname="";
        this.apptDt= "";
        this.apptFrTime= "";
        this.apptToTime= "";
        this.apptType= "";
        this.reason= "";
        this.status= "";
        this.patientId= "";
        this.patientname="";
        this.changedbyId='';

        // this.creationDt= "";
    }
}