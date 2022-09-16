import { Address } from "./Address";
import { PatientMaster } from "./PatientMaster";

export class PatientDetails{
    // firstName:string;
    // lastName:string;
    // email:string;
    dob:string;
    dialcode:string;
    contact:string;
    ethnicity:string;
    language:string;
    address:Address;
    patientMaster:PatientMaster;

    constructor(){
        // this.firstName='',
        // this.lastName='',
        // this.email=''
        this.dob='',
        this.dialcode='',
        this.contact='',
        this.ethnicity='',
        this.language='',
        this.address=new Address(),
        this.patientMaster=new PatientMaster()
    }
}
