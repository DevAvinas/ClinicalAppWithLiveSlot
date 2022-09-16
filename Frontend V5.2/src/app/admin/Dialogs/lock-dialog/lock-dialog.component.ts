
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientMaster } from '../../Model/PatientMaster';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-lock-dialog',
  templateUrl: './lock-dialog.component.html',
  styleUrls: ['./lock-dialog.component.css']
})
export class LockDialogComponent implements OnInit {

  name!: string;
  email!: string;
  userId: string='';
  userRole: string="Patient";
  actionBtn: string = "Activate";
  selectedPatient: PatientMaster = new PatientMaster();

  constructor(@Inject(MAT_DIALOG_DATA) public lockingData: any, private serv: AdminService, private dialogRef: MatDialogRef<LockDialogComponent>, private _snack:MatSnackBar) { }

  ngOnInit(): void {
    console.log("User ID:"+ this.lockingData.patient_id);
    if(this.lockingData.role==="Doctor" || this.lockingData.role==="Admin" || this.lockingData.role==="Nurse") 
      this.userId = this.lockingData.provider_id;
    else this.userId=this.lockingData.patient_id;

    this.name = this.lockingData.firstname +" "+ this.lockingData.lastname;
    this.email = this.lockingData.email;
    this.userRole=this.lockingData.role;
    console.log("Is the user an Employee: "+ !!this.userRole);
    // this.selectedPatient=this.lockingData;
    console.log("Patient status: " + this.lockingData.status);

    if (this.lockingData.active) this.actionBtn="Deactivate";
    else this.actionBtn="Activate"; 
    
  }

  lockUnlock(){
      if (this.userRole==="Doctor" || this.userRole==="Admin" || this.userRole==="Nurse")this.updateEmpStatus(this.actionBtn);
      else this.updatePatientStatus(this.actionBtn);
  }

  updateEmpStatus(actionBtn: string) {
    let status;
    if (actionBtn === "Deactivate") status="false"
    else status="true";
      this.serv.updateEmpStatus(this.email,status).subscribe(resp => {
          console.log(resp);
          this._snack.open(actionBtn+"d" ,"Ok",{
            duration: 3000
          });
          this.dialogRef.close(actionBtn+"d");
          this.serv.deleteInvalidAttemptCounts(this.email).subscribe(data=>console.log(data));
        });
  }


  updatePatientStatus(actionBtn: string) {
    let status;
    if (actionBtn === "Deactivate") status="false"
    else status="true";
      this.serv.updatePatientStatus(this.email,status).subscribe(resp => {
          console.log(resp);
          this._snack.open(actionBtn+"d" ,"Ok",{
            duration: 3000
          });
          this.dialogRef.close(actionBtn+"d");
          this.serv.deleteInvalidAttemptCounts(this.email).subscribe(data=>console.log(data));
        });
  }


}
