export class ApptSync {

    Subject: string;

    StartTime: Date;

    EndTime: Date;

    Location: string;

    Description: string;

    RecurrenceRule: string;

    IsBlock: Boolean;

    IsReadonly:Boolean;

    CategoryColor: string;

constructor(){

this.Subject='';

this.Location='';

this.Description='';

this.StartTime=new Date();

this.EndTime=new Date();

this.RecurrenceRule='';

this.IsBlock=true;

this.IsReadonly=true;

this.CategoryColor='';

}

}