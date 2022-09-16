import { Time } from "@angular/common";

export class UpcomingAppointments {
    meeting_id?:number;
    description ?:string;
    phy_id ?:number;
    dateofappointment?:Date;
    timeofappontment?:Time;
	reason?:string;
    history?:boolean;
    status?:string;
    patient_id?:number;

    }