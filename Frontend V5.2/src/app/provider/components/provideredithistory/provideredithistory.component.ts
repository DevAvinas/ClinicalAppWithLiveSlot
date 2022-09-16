import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentRequests } from '../../models/Appointmentrequests';
import { AppointmentEditHistory } from '../../models/provideredithistory';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';

@Component({
  selector: 'app-provideredithistory',
  templateUrl: './provideredithistory.component.html',
  styleUrls: ['./provideredithistory.component.css']
})
export class ProvideredithistoryComponent implements OnInit {

 
  username: any;
  response: AppointmentRequests[];
  status: string;

  constructor(private patientvisitService:PatientVisitDetailsService) {
   
   }

  ngOnInit(): void {
    this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id
    this.getNotifications();
 
  
  }
 edithist:AppointmentEditHistory[];
  appointments1=new AppointmentEditHistory();
  

  colors = [{ status: "unattended", color: "red" }, { status: "decline", color: "red" }, 
                { status: "confirm", color: "violet" }, { status: "complete", color: "green" }]

  getTheColor(status:any):any {
    // var row=document.getElementById("somerow");
    // var cells=row.getElementsByTagName("td");
    // this.status=cells[1].innerText
    // console.log("value"+cells[0].innerText)
    for(let color of this.colors)
    return this.colors.filter(item => item.status === status)[0].color 

    
    // could be better written, but you get the idea
}
  
  //This will make the font color of the "text" box yellow
 

  getNotifications(){
   
   
 
    
    
   
    this.patientvisitService.getbyPhysicianId(this.username).subscribe(obj=>{
     
    this.edithist=obj;
    console.log("notresp"+this.edithist)
   
 
     
     })
    
  }
  datePipe = new DatePipe('en-Us');
  today: string= this.datePipe.transform(new Date(), 'yyyy-MM-dd');
}


