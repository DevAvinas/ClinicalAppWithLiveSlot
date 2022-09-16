import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientVisitDetails } from 'src/app/nursemodule/models/PatientVisitDetails';

import { PatientVisitDetailsService } from 'src/app/nursemodule/services/patient-visit-details.service';
import { AppointmentRequests } from 'src/app/nursemodule/models/Appointmentrequests';

@Component({
  selector: 'app-patient-visit-details',
  templateUrl: './patient-visit-details.component.html',
  styleUrls: ['./patient-visit-details.component.css']
})
export class PatientVisitDetailsComponent implements OnInit {
  form!:FormGroup;
  submitted=false;
  patient:PatientVisitDetails = new PatientVisitDetails ();
  patients!:PatientVisitDetails[];
  patient1:AppointmentRequests;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'firstname', 'dor', 'status', 'lock'];
  dataSource!: MatTableDataSource<any>;
meetingid:any;
  appointmentdetail: any;
  username: any;
  resp: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,private patientvisitService:PatientVisitDetailsService,private dialogRef: MatDialogRef<PatientVisitDetailsComponent>) { 
    this.formData()
 //this.patients=this.getAllData();
 console.log("meetingidkp"+this.data)
 //this.getappointmentdetail(this.data);
  }

  

  ngOnInit(){
   // this.patients=this.getAllData();
   this.getvitalcheck();
   this.getbymeetingiddata();
   this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id;
   this.getAllData();
   setTimeout(()=>{                           // <<<---using ()=> syntax
   console.log("patientlog"+this.patients)
}, 3000);
  }
  getbymeetingiddata(){
    this.patientvisitService.getbymeetid(this.data).subscribe(obj=>{
    this.patient1=obj;
    console.log(obj);

    this.form.get('first_name')?.setValue(this.patient1.patientname);
        
        
        this.form.get('physician')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').provider_id);
    console.log("patientlognew"+this.patients[1])
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
  

  getAllData(){
    this.patientvisitService.getPatients().subscribe(obj=>{
    this.patients=obj;
    console.log("patientlognew"+this.patients[1])
    })
    
  }
  patientVisitDetail() {
    
    
   // this.router.navigate(['/', 'login'])
   this.submitted=true;
   if(this.form.invalid) {
     return;
   }
   this.patient.meetingid=this.data;
   this.patient.first_name=this.form.value.first_name
   this.patient.physician=this.username
   this.patient.height=this.form.value.height;
   this.patient.weight=this.form.value.weight;
   this.patient.bloodpressure=this.form.value.bloodpressure;
   this.patient.bodytemperature=this.form.value.bodytemperature;
   this.patient.respirationrate=this.form.value.respirationrate;
   console.log("meetingid"+this.patient.meetingid)

  //  this.dataSource=new  MatTableDataSource(this.form.value);
  //  this.dataSource.paginator = this.paginator;
  //  this.dataSource.sort = this.sort;
   console.log(this.form.value);
console.log(this.patient.meetingid);
   this.patientvisitService.addUser(this.patient).subscribe(obj => {
    //this.router.navigate(['/', 'login'])
    this.getAllData();
   this.getappointmentdetail(this.patient.meetingid);
    console.log(obj);
    this.dialogRef.close("value submitted");
   
 });
   }

   get f() {
    return this.form.controls;
  }
  getvitalcheck() {
    
    
    // this.router.navigate(['/', 'login'])
     
    this.patientvisitService.checkUser(this.data).subscribe(obj => {
     //this.router.navigate(['/', 'login'])
    this.resp=obj; 
    this.form.get('first_name')?.setValue(this.resp.first_name);
        
        
        this. form.get('physician')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').provider_id);
      this.form.get('height')?.setValue(this.resp.height);
     
       this.form.get('weight')?.setValue(this.resp.weight);
        this.form.get('bloodpressure')?.setValue(this.resp.bloodpressure);
        this.form.get('bodytemperature')?.setValue(this.resp.bodytemperature);
        this.form.get('respirationrate')?.setValue(this.resp.respirationrate);
  });
    }

  formData() {
    this.form = this.formBuilder.group

      ({

        first_name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        physician:new FormControl('',[Validators.required, Validators.minLength(3)]),
        height: new FormControl('', [Validators.required,Validators.max(250), Validators.maxLength(3)]),
        weight: new FormControl('', [Validators.required,Validators.pattern('[0-9]{2}.[0-9]{2}')]),
        bloodpressure: new FormControl('',[Validators.required, Validators.maxLength(3)]),
        bodytemperature:new FormControl('',[Validators.required, ]),
        respirationrate:new FormControl('',[Validators.required, Validators.maxLength(3)]),
      })
  }


 
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
