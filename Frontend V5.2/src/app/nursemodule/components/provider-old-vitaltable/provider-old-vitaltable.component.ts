import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PatientVisitDetails } from 'src/app/nursemodule/models/PatientVisitDetails';
import { PatientVisitDetailsService } from 'src/app/nursemodule/services/patient-visit-details.service';


@Component({
  selector: 'app-provider-old-vitaltable',
  templateUrl: './provider-old-vitaltable.component.html',
  styleUrls: ['./provider-old-vitaltable.component.css']
})
export class ProviderOldVitaltableComponent implements OnInit {
  
  submitted=false;
  patient:PatientVisitDetails = new PatientVisitDetails ();

  constructor(private patientvisitService:PatientVisitDetailsService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['first_name', 'physician', 'height', 'weight', 'bloodpressure','bodytemperature','respirationrate'];
  patients!:any;
  datasource: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData(){
    this.patientvisitService.getPatients().subscribe(obj=>{
      this.patients=obj;
     this.datasource= new MatTableDataSource(obj);
    console.log("patientlognew"+this.patients)
    })
    
  }
  // datasource: any=[
  //   {
  //     "first_name": "ffffff",
  //     "physician": "gggggggggg",
  //     "height": "234",
  //     "weight": "45.78",
  //     "bloodpressure": "78",
  //     "bodytemperature": "79",
  //     "respirationrate": "78",
  //     "id": 1
  //   }
  // ]
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.datasource.filter = filterValue.trim().toLowerCase();

  //   if (this.datasource.paginator) {
  //     this.datasource.paginator.firstPage();
  //   }
  // }
}
