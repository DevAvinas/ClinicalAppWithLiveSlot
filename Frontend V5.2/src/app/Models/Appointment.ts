export class Appointment{
    meetId: number;
    meetingTitle: string;
    description: string;
    phyId: string;
    apptDt: string;
    apptFrTime: string;
    apptToTime: string;
    apptType: string;
    reason: string;
    status: string;
    patientId: string;
    changedbyId:string;
    // creationDt: string;
    patientname:string;
    phyname:string;
    constructor() {
        this.meetId;
        this.meetingTitle= "";
        this.description= "";
        this.phyId= "";
        this.apptDt= "";
        this.apptFrTime= "";
        this.apptToTime= "";
        this.apptType= "";
        this.reason= "";
        this.status= "";
        this.patientId= "";
        this.changedbyId='';
        this.patientname='';
        this.phyname='';
        // this.creationDt= "";
    }


}