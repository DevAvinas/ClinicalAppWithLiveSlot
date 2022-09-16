import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UpcomingAppointments } from 'src/app/Models/UpcomingAppointments';
import { PatientVisitDetailsService } from 'src/app/provider/services/patient-visit-details.service';
import { AppointmentRequests } from '../../models/Appointmentrequests';
@Component({
  selector: 'app-provider-appointment-pages',
  templateUrl: './provider-appointment-pages.component.html',
  styleUrls: ['./provider-appointment-pages.component.css']
})
export class ProviderAppointmentPagesComponent implements OnInit {

  appointments:AppointmentRequests[];
  now: any;
  bookRatings:Array<any>=[] 
  username: string;

 constructor(private patientvisitService:PatientVisitDetailsService) { }
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
   
   this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id
   this.getAllUpcomingAppointments();
   this.getUpcomingAppointments();
 }

 getUpcomingAppointments(){
  this.patientvisitService.getUpcomingAppointmentnew(this.username).subscribe(obj=>{
    this.appointments=obj;
    console.log("patient"+this. appointments)
    })
 }
getAllUpcomingAppointments(){
 const datePipe = new DatePipe('en-Us');
 this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
 var response =[  {
   Subject:"PT001_Khan_",
   description :"Cough/Cold",
   phy_id :"Dr.Subramanium",
   patient_id:"Mr.khan",
   dateofappointment:"2022-04-05",
   startTime:"9:00",
   endTime:"10:00",
  reason:"string"
   },{
   Subject:"PT001_DC_",
   description :"Data Collection",
   phy_id :"Dr.Ramanujam",
   patient_id:"Ms.Marry",
   dateofappointment:"2022-04-06",
   startTime:"10:00",
   endTime:"11:00",
  reason:"string"
   }];


//console.log(bookRatings)

response.forEach(item=>{ 
 var isToday=false;
//  var physicianName='Dr. Khan';
 if (item.dateofappointment===this.now) {
         isToday=true;
 }
  this.bookRatings.push(
  {
   // "name":item.name,
   // "rating":item.rating
   "Subject":item.Subject+item.dateofappointment,
   "description" :item.description,
   "physicianName":item.phy_id,
   "patientname":item.patient_id,
   "dateofappointment":item.dateofappointment,
   "Time_slot":item.startTime+'-'+item.endTime,
   "History":"None",
   "isToday":isToday
  });
});
console.log(this.bookRatings);
}
}
