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
import { DiagnosisMasterService } from 'src/app/provider/services/diagnosis-master.service (1)';
import { ProcedureMasterService } from 'src/app/provider/services/procedure-master.service (1)';
import { ProcedureMaster } from 'src/app/provider/models/ProcedureMaster (1)';
import { DiagnosisMaster } from 'src/app/provider/models/DiagnosisMaster (1)';

import { ProcedureMasterComponent } from 'src/app/provider/components/Procedure-master/procedure-master.component';
import { DiagnosisMasterComponent } from 'src/app/provider/components/diagnosis-master/diagnosis-master.component';

@Component({
  selector: 'app-vitalmodal',
  templateUrl: './vitalmodal.component.html',
  styleUrls: ['./vitalmodal.component.css']
})
export class VitalmodalComponent implements OnInit {
  patients!:PatientVisitDetails[];
  procedures!:ProcedureMaster[];
  diagnolist!:DiagnosisMaster[];

  posts:any;
  tempo:any;
  temporary:any;
  appointmentdetail: any;
  medicationoutdetail:any;
  posts1: any;
  constructor(private router: Router,private patientvisitService:PatientVisitDetailsService,private medicationdetailsservice:MedicationDetailsService,private route: ActivatedRoute,
    private dialog: MatDialog,private diagnosisMasterService: DiagnosisMasterService,private procedureMasterServ: ProcedureMasterService
    
    ) { }

  ngOnInit(): void {
  
    this.temporary=this.route.snapshot.paramMap.get('meeting_id')
    console.log("tempvalue"+this.temporary);
    this.getappointmentdetail(this.temporary);
    this.getMedicationOutputdetail(this.temporary);
    //this.temporary=this.route.snapshot.paramMap.get('meeting_id');
    this.getData1();
    this.getData2();
  }
  getData1(){
    this.procedureMasterServ.getData().subscribe((res:any)=>{
      this.procedures=res;
       console.log("value is -->"+this.procedures);
     })
  }
  getData2(){
    this.diagnosisMasterService.getData().subscribe((res:any)=>{
      console.log("data is---->"+res[0]);
      this.diagnolist=res;
     // this.dataSource= new MatTableDataSource(res);
      console.log("value is -->"+this.diagnolist);
    })
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
  getDiagnosisData(id: any){
    this.diagnosisMasterService.findDiagnosisByMeeingId(id).subscribe((res:any)=>{
      this.posts=res;
     // this.dataSource= new MatTableDataSource(res);
      console.log("value is -->"+this.posts);
    })
  }

  getProcedureData(id: any){
    this.procedureMasterServ.findProcedureByMeeingId(id).subscribe((res:any)=>{
      this.posts1=res;
     // this.dataSource= new MatTableDataSource(res);
      console.log("value is -->"+this.posts);
    })
  }

 addvitals(){
  
    this.dialog.open(PatientVisitDetailsComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp =>{console.log(resp);this.getappointmentdetail(this.temporary)} );

  }
  addMedication(){
    this.dialog.open(MedicationDetailsComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp1 =>{console.log(resp1);this.getMedicationOutputdetail(this.temporary)} );

  }
  addDiagnosis(){
    this.dialog.open(DiagnosisMasterComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp =>{console.log(resp);this. getDiagnosisData(this.temporary)} );

  }
  addProcedure(){
    this.dialog.open(ProcedureMasterComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp =>{console.log(resp);this.getProcedureData(this.temporary)} );

  }
}
