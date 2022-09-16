import { PatientMaster } from "./PatientMaster";

export class Address{
    line1:string;
    line2:string;
    postalcode:string;
    city:string;
    state:string;
    country:string;
    address_type: string;
    patientRegistrationDetails:PatientMaster;
    addressId:number;
    constructor(){
        this.line1='';
        this.line2='';
        this.postalcode='';
        this.city='';
        this.state='';
        this.country='';
        this.address_type='';
        this.addressId;
        this.patientRegistrationDetails=new PatientMaster();


    }
}