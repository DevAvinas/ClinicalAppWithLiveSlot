import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProBookDialogComponent } from '../../Dialog/booking-dialog/pro-book-dialog.component';
import { AppointmentRequests } from '../../models/Appointmentrequests';
import { MedicationDetailsService } from '../../services/medication-details.service';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';

@Component({
  selector: 'app-upcomingconfirmedappointments',
  templateUrl: './upcomingconfirmedappointments.component.html',
  styleUrls: ['./upcomingconfirmedappointments.component.css']
})
export class UpcomingconfirmedappointmentsComponent implements OnInit {

  constructor(private _snack:MatSnackBar,private patientvisitService:PatientVisitDetailsService,private medservice:MedicationDetailsService,private dialog:MatDialog) { }
  alertflag1:boolean=true;
  ngOnInit(): void {
    this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id
   console.log("hhghh"+this.username);
   this.getUpcomingAppointmentsByStatus();
  }
  appointments1=new AppointmentRequests();
  appointments!:AppointmentRequests[];
  now: any;
  
  rescheduleFunction(meetingdata:any){
    this.dialog.open(ProBookDialogComponent, { width: '100%',data:meetingdata}).afterClosed().subscribe(resp => this.getUpcomingAppointmentsByStatus());
  }
   
    
  username: string;

  // getUpcomingAppointmentsnw(){
  //   this.medservice.getUpcomingAppointmentnew(this.username).subscribe(obj=>{
  //     this.appointments=obj;
  //     console.log("patientlognewkp"+this.appointments)
  //     })
  //  }
  getUpcomingAppointmentsByStatus(){
    this.patientvisitService.getUpcomingAppointmentsByStatus().subscribe(obj=>{
      this.appointments=obj;
      console.log(this.appointments);
      this.alertflag1=false;
      })
   }
   acceptFunction(temporary:any){
  
    
    
    this.appointments1.status="complete";
    this.appointments1.changedbyId=this.username;
 this.appointments1.meetId= temporary;
   
    this.patientvisitService.addcompletedStatus(this.appointments1,this.appointments1.meetId).subscribe(obj=>{
      this.getUpcomingAppointmentsByStatus();
      this._snack.open("Appointment completed successfully" ,"Ok")
      duration: 3000
  
    
 
     //this.getUpcomingAppointmentRequests();
     console.log("patient1"+this. appointments)
     })
  }
 
   unattendedFunction(meetdata:any){
    this.appointments1.status="unattended";
    this.appointments1.changedbyId=this.username;
 this.appointments1.meetId=meetdata;
   
    this.patientvisitService.addStatus(this.appointments1,this.appointments1.meetId).subscribe(obj=>{
     
    
    // alert("Appointment marked as unattended successfully");
    this._snack.open("Appointment marked as unattended successfully" ,"Ok")
    duration: 3000
     this.getUpcomingAppointmentsByStatus();
     console.log("patient1"+this. appointments)
     
     })
   }
   datePipe = new DatePipe('en-Us');
  today: string= this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  
}
