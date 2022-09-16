import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { PatientVisitDetails } from 'src/app/Models/PatientVisitDetails';
import { MedicationDetailsService } from 'src/app/provider/services/medication-details.service';
import { PatientVisitDetailsService } from 'src/app/provider/services/patient-visit-details.service';
import { MedicationDetailsComponent } from 'src/app/provider/components/medication-details/medication-details.component';
import { PatientVisitDetailsComponent } from 'src/app/provider/components/patient-visit-details/patient-visit-details.component';

//import { ProviderAppointmentPagesComponent } from 'src/app/nursemodule/components/provider-appointment-pages';

@Component({
  selector: 'app-nursevitalmodel',
  templateUrl: './nursevitalmodel.component.html',
  styleUrls: ['./nursevitalmodel.component.css']
})
export class NursevitalmodelComponent implements OnInit {

  patients!:PatientVisitDetails[];
  

  posts:any;
  tempo:any;
  temporary:any;
  appointmentdetail: any;
  medicationoutdetail:any;
  posts1: any;
  meetingIDVital: any;
  constructor(private router: Router,private patientvisitService:PatientVisitDetailsService,private medicationdetailsservice:MedicationDetailsService,private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit(): void {
   // this.getAllData1();
    this.temporary=this.route.snapshot.paramMap.get('meeting_id')
    this.meetingIDVital=this.temporary;
   
    console.log("tempvalue"+this.temporary);
    this.getappointmentdetail(this.temporary);
    this.getMedicationOutputdetail(this.temporary);
    //this.temporary=this.route.snapshot.paramMap.get('meeting_id');
   
  }
  

//  openCity(){
// var i,tabcontent,tablinks;
// tabcontent=document.getElementsByClassName("tabcontent");
// for (i = 0; i < tabcontent.length; i++) {
//   tabcontent[i].
// }
// tablinks = document.getElementsByClassName("tablinks");
// for (i = 0; i < tablinks.length; i++) {
//   tablinks[i].className = tablinks[i].className.replace(" active", "");
// }
// document.getElementById(cityName).style.display = "block";
 
  
// }
itemStringsLeft = [
  'Windstorm',
  'Bombasto',
  'Magneta',
  'Tornado'
];
  disableSwitching!: boolean;
  @ViewChild('tabset')
  tabset!: TabsetComponent;
  

  ngAfterViewInit(){
    console.log(this.tabset.tabs);
  }

  goto(id:number){
    this.tabset.tabs[id].active = true;
  }

  
  // getAllData(){
  //   this.patientvisitService.getPatients().subscribe(obj=>{
  //   this.patients=obj;
  //   console.log("patientlognew"+this.patients[1])
  //   })
    
  // }
  getAllData1(){
    this.medicationdetailsservice.getData().subscribe((res:any)=>{
     
      this.posts=res
      
      console.log("kkkk"+this.posts);
    
     
    })
  }
  
  getappointmentdetail(id: any) {
    this. patientvisitService.get(id)
      .subscribe(
        data => {
         this.appointmentdetail = data;
          console.log("physician obj"+data);
        },
        error => {
          console.log(error);
        });
  }

  getMedicationOutputdetail(id: any) {
    this.medicationdetailsservice.get(id)
      .subscribe(
        data => {
         this.medicationoutdetail = data;
          console.log("medobj"+data.value[1]);
        },
        error => {
          console.log(error);
        });
  }
 

 addvitals(){
  
    this.dialog.open(PatientVisitDetailsComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp =>{console.log(resp);this.getappointmentdetail(this.temporary)} );

  }

}
