import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import * as lodash from 'lodash';
import { AppointmentEditHistory } from 'src/app/Models/AppointmentEditHistory';
import { AppointmentEditHistoryService } from 'src/app/Services/appointment-edit-history.service';

@Component({
  selector: 'app-patient-upcoming-appointments',
  templateUrl: './patient-upcoming-appointments.component.html',
  styleUrls: ['./patient-upcoming-appointments.component.css']
})
export class PatientUpcomingAppointmentsComponent implements OnInit {
 
   bookRatings:Array<any>=[] 
  phyArr: any[];
  display = "none";
  historyArr: any;
  now: string;
  alertflag1:boolean=false;
  constructor(private apptHistory:AppointmentEditHistoryService,private apptserv: AppointmentService) { }
  timeSlots=  [
    {key:"9:00-10:00",value:"9 A.M. - 10 A.M."},
    {key:"10:00-11:00",value:"10 A.M. - 11 A.M."},
    {key:"11:00-12:00",value:"11 A.M. - 12 Noon"},
    {key:"12:00-13:00",value:"12 Noon - 1 P.M."},
    
    {key:"14:00-15:00",value:"2 P.M. - 3 P.M."},
    {key:"15:00-16:00",value:"3 P.M. - 4 P.M."},
    {key:"16:00-17:00",value:"4 P.M. - 5 P.M."}
   ];
  ngOnInit(): void {
    this.getAllUpcomingAppointments();
    
  }

getAllUpcomingAppointments(){

  const datePipe = new DatePipe('en-Us');
  this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  var n = new Date().toLocaleTimeString('en-GB');
  console.log(n);
  console.log("12:00:00">n);
     this.phyArr=[];
     this.apptserv.getppointmentByStatus
     (JSON.parse(sessionStorage.getItem('User') || '{}').patient_id,['reschedule','confirm','request'])
 

    //('PT005','Req')
    .subscribe((data: any)=>{
      console.log(data)
        data.forEach((element: any) => {
          element.apptDt=datePipe.transform(element.apptDt, 'yyyy-MM-dd');
          console.log(element.apptFrTime>n);
          //&&(element.apptFrTime>n)
          // console.log('30/04/2022'<'02/05/2022');
          console.log(this.now<element.apptDt);

          console.log(this.now+"---"+element.apptDt);

          // console.log(datePipe.transform(new Date(), 'dd/MM/yyyy')<datePipe.transform(element.apptDt, 'dd/MM/yyyy'));
          var today = new Date(this.now);
          var temp = new Date (element.apptDt);
          console.log(today===temp);

          if((today<temp)){
            this.phyArr.push(element);
          }
          if((today==temp)&&(element.apptFrTime>n)){
            this.phyArr.push(element);

          }
        });
         //this.phyArr.push(data);

         lodash.mapValues(this.phyArr, (value, key) => {
          if (value.apptDt<=this.now) {
            value.isToday=true;
              }  else{
                value.isToday=false;

              }
  });
      if(this.phyArr.length==0){
        this.alertflag1=true;
      }
      console.log(this.phyArr)
    })
    
}

openModal(value:any) {
  console.log(value);
  this.display = "block";
  this.fetchHistory(value);
}
onCloseHandled() {
  this.display = "none";
}
fetchHistory(id:string){
  const datePipe = new DatePipe('en-Us');
  this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.apptHistory.getHistory(id)
      .subscribe(data=>{
        data.forEach((n: any) => {
          n.apptDt=datePipe.transform(n.apptDt, 'yyyy-MM-dd');
          n.modifiedTs=datePipe.transform(n.modifiedTs, 'dd/MM/yyyy hh:mm a');
        });
        this.historyArr=data;
        console.log(this.historyArr)

      })
      const str = '2017-02-17T22:32:25.000Z';
const d = new Date(str);
console.log(d)
}

}
