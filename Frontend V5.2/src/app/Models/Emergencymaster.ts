export class PatientEmergencyDetails{
    // patient_emergency_contact_id? :number;


    first_name?: string;
	last_name?: string;
    email?:string;
	relationship?: string;
	phone?: string;
	country_Code?: string;
    // patient_id ?:number;
	access_allow?: boolean


  constructor() {
    this.first_name = ''
    this.last_name = ''
    this.email = ''
    this.relationship = ''
    this.phone = ''
    this.country_Code = ''
    this.access_allow = false
  }

}