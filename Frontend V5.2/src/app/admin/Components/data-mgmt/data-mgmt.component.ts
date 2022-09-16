import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DiagnosisMasterComponent } from '../../Dialogs/diagnosis-master/diagnosis-master.component';
import { MedicationDialogComponent } from '../../Dialogs/medication-dialog/medication-dialog.component';
import { ProcedureDialogComponent } from '../../Dialogs/procedure-dialog/procedure-dialog.component';
import { DiagnosisMaster } from '../../Model/DiagnosisMaster';
import { MedicationMaster } from '../../Model/MedicationMaster';
import { ProcedureMaster } from '../../Model/ProcedureMaster';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-data-mgmt',
  templateUrl: './data-mgmt.component.html',
  styleUrls: ['./data-mgmt.component.css']
})
export class DataMgmtComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['diagnosisCode','diagnosisDescription', 'diagnosisIsDepricated', 'edit','delete'];
  displayedColumns2: string[] = ['procedureCode','procedureDescription', 'procedureIsDepricated', 'edit','delete'];
  displayedColumns3: string[] = ['drug_id', 'drug_name','drug_generic_name', 'drug_brand_name','drug_form', 'edit','delete'];

  dataSource1!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  dataSource3!: MatTableDataSource<any>;

  

  dgArr!: DiagnosisMaster[];
  pgArr!: ProcedureMaster[];
  mgArr!: MedicationMaster[];


  
  constructor(private serv: AdminService, private dialog: MatDialog,private _snack:MatSnackBar) { 
    
  }

  ngOnInit(): void {
    this.getDiagnosisData();
    this.getProcedureData();
    this.getMedicationData();
  }

  getDiagnosisData(){
   
    this.serv.getAllDiagnosis().subscribe((res:any)=>{
      this.dgArr=res;
      this.dataSource1 = new MatTableDataSource(this.dgArr);
     // this.dataSource= new MatTableDataSource(res);
      console.log("Get all Diagnosis : "+this.dgArr);
    })
  }

  getProcedureData(){
   
    this.serv.getAllProcedure().subscribe((res:any)=>{
      this.pgArr=res;
      this.dataSource2 = new MatTableDataSource(this.pgArr);
     // this.dataSource= new MatTableDataSource(res);
      console.log("Get all Procedure : "+this.pgArr);
    })
  }

  getMedicationData(){
   
    this.serv.getAllMedication().subscribe((res:any)=>{
      this.mgArr=res;
      this.dataSource3 = new MatTableDataSource(this.mgArr);
     // this.dataSource= new MatTableDataSource(res);
      console.log("Get all Medication : "+this.mgArr);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }
  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }
  applyFilter3(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource3.filter = filterValue.trim().toLowerCase();
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }


 
  addDiagnosis(){
     this.dialog.open(DiagnosisMasterComponent, { panelClass: 'custom-dialog-container' ,width:'100%'}).afterClosed().subscribe(resp =>{console.log(resp);this.getDiagnosisData()} );
  } 
  addProcedure(){
    this.dialog.open(ProcedureDialogComponent, { panelClass: 'custom-dialog-container' ,width:'100%'}).afterClosed().subscribe(resp =>{console.log(resp);this.getProcedureData()} );
  }
  addMedication(){
    this.dialog.open(MedicationDialogComponent, { panelClass: 'custom-dialog-container' ,width:'100%'}).afterClosed().subscribe(resp =>{console.log(resp);this.getMedicationData()} );
  }


  // addMedication(){
  //   this.dialog.open(MedicationDetailsComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data:this.temporary}).afterClosed().subscribe(resp1 =>{console.log(resp1);this.getMedicationOutputdetail(this.temporary)} );

  // }

  editDiagnosis(event: DiagnosisMaster){
    this.dialog.open(DiagnosisMasterComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data: event}).afterClosed().subscribe(resp =>{console.log(resp);this.getDiagnosisData()} );
  }
  editProcedure(event: DiagnosisMaster){
    this.dialog.open(ProcedureDialogComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data: event}).afterClosed().subscribe(resp =>{console.log(resp);this.getProcedureData()} );
  }
  editMedication(event: DiagnosisMaster){
    this.dialog.open(MedicationDialogComponent, { panelClass: 'custom-dialog-container' ,width:'100%',data: event}).afterClosed().subscribe(resp =>{console.log(resp);this.getMedicationData()} );
  }


  deleteDiagnosis(event:any){
    this.serv.deleteDiagnosis(event.id).subscribe(resp=>{
      alert(resp);
      
      this.getDiagnosisData();
      
    }, err => {
      this._snack.open("Drug ID: "+event.diagnosisCode+" Successfully deleted","Ok",{
        duration: 3000
      });
      this.getDiagnosisData();
    })
  }
  deleteProcedure(event:any){
    this.serv.deleteProcedure(event.id).subscribe(resp=>{
      alert(resp);
      this.getDiagnosisData();
    }, err => {
      this._snack.open("Procedure ID: "+event.procedureCode+" Successfully deleted","Ok",{
        duration: 3000
      });
      this.getProcedureData();
    })
  }
  deleteMedication(event:any){
    this.serv.deleteMedication(event.drug_id).subscribe(resp=>{
      alert(resp);
      this.getDiagnosisData();
    }, err => {
      this._snack.open("Medication ID: "+event.drug_id+" Successfully deleted","Ok",{
        duration: 3000
      });
      this.getMedicationData();
    })
  }

}
