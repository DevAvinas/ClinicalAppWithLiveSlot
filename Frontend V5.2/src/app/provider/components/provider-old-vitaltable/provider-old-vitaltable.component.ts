import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PatientVisitDetails } from '../../models/PatientVisitDetails';
import { MedicationDetailsService } from '../../services/medication-details.service';
import { PatientVisitDetailsService } from '../../services/patient-visit-details.service';


@Component({
  selector: 'app-provider-old-vitaltable',
  templateUrl: './provider-old-vitaltable.component.html',
  styleUrls: ['./provider-old-vitaltable.component.css']
})
export class ProviderOldVitaltableComponent implements OnInit {
  medicationoutdetail: any;
  submitted=false;
  patient:PatientVisitDetails = new PatientVisitDetails ();
  temporary: any;
  appointmentdetail: any;

  constructor(private patientvisitService:PatientVisitDetailsService,private medicationdetailsservice: MedicationDetailsService,private route: ActivatedRoute) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['first_name', 'physician', 'height', 'weight', 'bloodpressure','bodytemperature','respirationrate'];
  displayedColumns1: string[] = ['drug_id', 'drug_name', 'drug_generic_name', 'drug_brand_name', 'drug_form'];
  displayedColumns2: string[] = ['diagnosisCode', 'diagnosisDescription', 'diagnosisIsDepricated'];
  displayedColumns3: string[] = ['drug_id', 'drug_name', 'drug_generic_name', 'drug_brand_name', 'drug_form'];
  patients!:any;
  datasource: MatTableDataSource<any>;
  datasource1: MatTableDataSource<any>;

  ngOnInit(): void {
    this.temporary=this.route.snapshot.paramMap.get('meetId')
    console.log(this.temporary)
    this.getMedicationOutputdetail(this.temporary)
    this.getappointmentdetail(this.temporary)
  }
  
    
  
  getMedicationOutputdetail(id: any) {
    this.medicationdetailsservice.get(id)
      .subscribe(
        data => {
         this.medicationoutdetail = data;
         this.datasource= new MatTableDataSource(data);
          console.log("physician obj"+data);
        },
        error => {
          console.log(error);
        });
  }

  getappointmentdetail(id: any) {
    this. patientvisitService.get(id)
      .subscribe(
        data => {
         this.appointmentdetail = data;
         this.datasource1= new MatTableDataSource(data);
          console.log("physician obj"+data);
        },
        error => {
          console.log(error);
        });
  }
}
