import { Component, OnInit } from '@angular/core';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';
import { AppointmentRequests } from 'src/app/provider/models/Appointmentrequests';
import { DatePipe } from '@angular/common';
import { AppointmentEditHistory } from '../../models/provideredithistory';

@Component({
  selector: 'app-notificationprovider',
  templateUrl: './notificationprovider.component.html',
  styleUrls: ['./notificationprovider.component.css']
})
export class NotificationproviderComponent implements OnInit {
  username: any;
  response:AppointmentRequests[];

  constructor(private patientvisitService:PatientVisitDetailsService) { }

  ngOnInit(): void {
    this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id
    this.getNotifications();
  }
  appointments: AppointmentEditHistory[];
  appointments2:any=[] ;
  appointments3:AppointmentEditHistory[] ;
  appointments1=new AppointmentEditHistory();
  now: string;
  getNotifications(){
   
   
 
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'dd/MM/yyyy');
    
   console.log(this.username);
    this.patientvisitService.getbyPhysicianId(this.username).subscribe(obj=>{
     
  // this.appointments3=obj;
    console.log("notresp"+obj)
    obj.forEach((n: AppointmentEditHistory) => {
      if (datePipe.transform(n.apptDt, 'dd/MM/yyyy')>=this.now
              && (n.status=='decline'||n.reason.includes('reschedule'))){
                n.apptDt=datePipe.transform(n.apptDt, 'dd/MM/yyyy');
                n.modifiedTs=datePipe.transform(n.modifiedTs, 'dd/MM/yyyy hh:mm a');

                  this.appointments2.push(n);

                  console.log("notfication data ----"+this.appointments2);

      }
 
     
     });
     this.appointments2.reverse();
     console.log(this.appointments2);
})
  }
 

}
