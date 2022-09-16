export class PatientMaster {
    title:string;
    firstname:string;
    lastname:string;
    email:string;
    dob:string;
    role:string;
    password:string;
    active:Boolean;
    dor:string;
    confirmpassword:string;

    constructor() {
        this.title=''
        this.firstname=''
        this.lastname=''
        this.email=''
        this.dob=''
        this.role=''
        this.password=''
        this.active=false
        this.dor=''
        this.confirmpassword=''
    }
}
