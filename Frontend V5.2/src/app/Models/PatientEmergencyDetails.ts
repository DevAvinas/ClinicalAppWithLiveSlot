import { PatientMaster } from "./PatientMaster";

export class PatientEmergencyDetails{
    first_name?: string;
	last_name?: string;
    email?:string;
	relationship?: string;
	phone?: string;
	dialcode?: string;
    // patient_id ?:number;
	access_allow?: boolean
	patientRegistrationDetails:PatientMaster;
  emergency_details_id:number;

  constructor() {
    this.first_name = ''
    this.last_name = ''
    this.email = ''
    this.relationship = ''
    this.phone = ''
    this.dialcode = ''
    this.access_allow;
    this.emergency_details_id;
	this.patientRegistrationDetails=new PatientMaster();

  }
}