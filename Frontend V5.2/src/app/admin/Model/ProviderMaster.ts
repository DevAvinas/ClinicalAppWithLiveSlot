export class ProviderMaster {
    provider_id:string;
    title:string;
    firstname:string;
    lastname:string;
    email:string;
    dob:string;
    role:string;
    password:string;
    active:boolean;
    otpFlag: boolean;

    constructor() {
        this.provider_id='';
        this.title='';
        this.firstname='';
        this.lastname='';
        this.email='';
        this.dob='';
        this.role='';
        this.password='';
        this.active;
        this.otpFlag;
    }
}
