import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../Service/admin.service';

import { LockDialogComponent } from '../lock-dialog/lock-dialog.component';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent implements OnInit {

  
  name!: string;
  email!: string;
  empid!: string;
  empRole!: string;
  // selectedPatient: PatientMaster = new PatientMaster();

  constructor(@Inject(MAT_DIALOG_DATA) public lockingData: any, private serv: AdminService, private dialogRef: MatDialogRef<ResetDialogComponent>,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.lockingData);
    this.name = this.lockingData.firstname + this.lockingData.lastname;
    this.email = this.lockingData.email;
    this.empRole=this.lockingData.role;
    this.empid=this.lockingData.provider_id;
    console.log("Is the user an Employee: "+ !!this.empRole);
    // this.selectedPatient=this.lockingData;
    console.log("Patient status: " + this.lockingData.status);
  
  }

  resetPassword(){
    this.lockingData.password="ResetPassword";
    this.serv.resetPassword(this.email)
        .subscribe((resp: any) => {
          let message= resp['message'];
          console.log(message);
          this._snack.open(message ,"Ok",{
            duration: 3000
          });
          alert(message);
          this.dialogRef.close("Resetted");
          this.serv.deleteInvalidAttemptCounts(this.email).subscribe(data=>console.log(data));
        });
  }

}
