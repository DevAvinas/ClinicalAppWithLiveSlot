import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ProBookDialogComponent } from '../../Dialog/booking-dialog/pro-book-dialog.component';
import { AppointmentRequests } from '../../models/Appointmentrequests';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';

@Component({
  selector: 'app-requested-appointments',
  templateUrl: './requested-appointments.component.html',
  styleUrls: ['./requested-appointments.component.css']
})
export class RequestedAppointmentsComponent implements OnInit {

  alertflag1:boolean;
  procedureDetailsForm!: FormGroup;
  now: any;
  bookRatings:Array<any>=[] 
  appointments: AppointmentRequests[];
  appointments1=new AppointmentRequests();
  username: string;
  temporary: any;

 constructor(private patientvisitService:PatientVisitDetailsService,private route: ActivatedRoute,private dialog:MatDialog,private _snack:MatSnackBar) { 
  this.procedureDetailsForm = new FormGroup({
    dec: new FormControl()
  });
 }
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
   console.log(this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id);
   this.getUpcomingAppointmentRequests();
   this.temporary=this.route.snapshot.paramMap.get('meetId')
 }

 getUpcomingAppointmentRequests(){
   console.log("hhghh")
  this.patientvisitService.getUpcomingAppointmentrequests(this.username).subscribe(obj=>{
    this.appointments=obj;
    console.log("patientlognew"+this.appointments)
    this.alertflag1=false;
    })
 }

 acceptFunction(event:any,data1:any){
   console.log(event)
   console.log(this.appointments.values)
   if(data1=="confirm"){

   
   this.appointments1.status=data1;
   this.appointments1.changedbyId=this.username;
this.appointments1.meetId=event;
  
   this.patientvisitService.addStatus(this.appointments1,this.appointments1.meetId).subscribe(obj=>{
    
    this._snack.open("Appointment accepted successfully" ,"Ok")
    duration: 3000
   // alert("Appointment accepted successfully");
    this.getUpcomingAppointmentRequests();
    console.log("patient1"+this. appointments)
    
    })
 }
 if(data1=="decline"){

   
  this.appointments1.status=data1;
  this.appointments1.changedbyId=this.username;
this.appointments1.meetId=event;
 this.appointments1.reason=this.procedureDetailsForm?.get('dec').value;
console.log("reason:"+this.appointments1.reason)
  this.patientvisitService.addStatus(this.appointments1,this.appointments1.meetId).subscribe(obj=>{
   
  
  // alert("Appointment Declined successfully");
  this._snack.open("Appointment Declined successfully" ,"Ok")
  duration: 3000
   this.getUpcomingAppointmentRequests();
   console.log("patientlogdec"+this. appointments)
   })
}
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

rescheduleFunction(meetingdata:any){
  this.dialog.open(ProBookDialogComponent, { width: '100%',data:meetingdata}).afterClosed().subscribe(resp =>this.getUpcomingAppointmentRequests());
}


datePipe = new DatePipe('en-Us');
today: string= this.datePipe.transform(new Date(), 'yyyy-MM-dd');
}
