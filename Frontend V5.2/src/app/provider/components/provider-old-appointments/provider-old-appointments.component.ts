import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentRequests } from '../../models/Appointmentrequests';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';

@Component({
  selector: 'app-provider-old-appointments',
  templateUrl: './provider-old-appointments.component.html',
  styleUrls: ['./provider-old-appointments.component.css']
})
export class ProviderOldAppointmentsComponent implements OnInit {
  appointments:AppointmentRequests[];
  username: any;
  temporary: string;

  ngOnInit(): void {
    this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id
    this.temporary=this.route.snapshot.paramMap.get('meetId')
    this.getOldAppointmentRequests();
  }
 
 
  now: any;
  bookRatings:Array<any>=[] 

 constructor(private router: Router,private patientvisitService:PatientVisitDetailsService,private route: ActivatedRoute) { }
 
 
 getReport(data:any){
  console.log(data);
  let temp = data.split('-')[1];
  console.log(temp);
  this.router.navigate(['/report',parseInt(temp)]); 
  //sub.split(',')[3].split(':')[1];
}
 getOldAppointmentRequests(){
  console.log("hhghh")
 this.patientvisitService.getOldAppointmentnew(this.username).subscribe(obj=>{
   this.appointments=obj;
   console.log("oldappointments"+this.appointments)
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
   phy_id :"Dr.Ram",
   patient_id:"Ms.moris",
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
