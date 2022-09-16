export class ProviderMaster {

    provider_id:string;

    title:string;

    firstname:string;

    lastname:string;

    email:string;

    dob:string;

    role:string;

    password:string;

    status:string;

    dor:string;



    constructor() {

        this.provider_id=''

        this.title=''

        this.firstname=''

        this.lastname=''

        this.email=''

        this.dob=''

        this.role=''

        this.password='admin123'

        this.status='Active'

        this.dor= new Date().toString();

    }

}