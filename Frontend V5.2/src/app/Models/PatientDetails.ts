import { Address } from "./Address";
import { PatientMaster } from "./PatientMaster";

export class PatientDetails{
    // firstName:string;
    // lastName:string;
    // email:string;
    patient_details_id:number;
    dob:string;
    age:string;
    gender:string;
    dialcode:string;
    contact:string;
    ethnicity:string;
    language:string;
    //address:Address;
    patientRegistrationDetails:PatientMaster;

    constructor(){
        // this.firstName='',
        // this.lastName='',
        // this.email=''
        
        this.dob='',
        this.age='',
        this.dialcode='',
        this.contact='',
        this.ethnicity='',
        this.language='',
        this.gender='',
        //this.address=new Address(),
        this.patientRegistrationDetails=new PatientMaster();
    }
}
