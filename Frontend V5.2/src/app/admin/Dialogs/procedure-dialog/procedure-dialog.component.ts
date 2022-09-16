import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProcedureMaster } from '../../Model/ProcedureMaster';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-procedure-dialog',
  templateUrl: './procedure-dialog.component.html',
  styleUrls: ['./procedure-dialog.component.css']
})
export class ProcedureDialogComponent implements OnInit {

  procedureDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  procedureMaster: ProcedureMaster = new ProcedureMaster();
  form: any;
  procedure!: ProcedureMaster[];
  tempdescription!: any;
  action="Add";

  saveProcedureDetails() {

    console.log("data---->" + this.procedureDetailsForm.value);
    this.submitted = true;
    if (this.procedureDetailsForm.invalid) {
      return;
    }

    if (!this.data) {
      this.populateModel();
    }
    else {
      this.populateDataModel();
    }
    console.log("Da: "+Object.values(this.procedureMaster));
    this.serv.saveProcedure(this.procedureMaster).subscribe(obj => {
      console.log(obj);
      if(!this.data){
        this._snack.open("Procedure: "+ obj.procedureCode+" added Successfully","Ok",{
          duration: 3000
        });
      }
      else{
        this._snack.open("Procedure Code: "+ obj.procedureCode +" is Updated Successfully","Ok",{
          duration: 3000
        });
      } 
      this.dialogRef.close("value submitted");
    });
  }

  populateModel() {
  
    this.procedureMaster.procedureCode = this.procedureDetailsForm.get('procedureCode')?.value;
    this.procedureMaster.procedureDescription = this.procedureDetailsForm.get('procedureDescription')?.value;
    this.procedureMaster.procedureIsDepricated = this.procedureDetailsForm.get('procedureIsDepricated')?.value;
    console.log("dia:" + this.procedureMaster.procedureCode);
  }
  populateDataModel() {
    this.procedureMaster.id =  this.data.id;
    this.procedureMaster.procedureCode = this.procedureDetailsForm.get('procedureCode')?.value;
    this.procedureMaster.procedureDescription = this.procedureDetailsForm.get('procedureDescription')?.value;
    this.procedureMaster.procedureIsDepricated = this.procedureDetailsForm.get('procedureIsDepricated')?.value;
  }

  get f() {
    return this.procedureDetailsForm.controls;
  }

  constructor(private _snack:MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: ProcedureMaster, private dialogRef: MatDialogRef<ProcedureDialogComponent>, private serv: AdminService, private fb: FormBuilder) {
    this.formData();
  }

  ngOnInit(): void {
    if(this.data){
      this.action="Update";
      this.procedureDetailsForm.get('procedureCode')?.setValue(this.data.procedureCode);
      this.procedureDetailsForm.get('procedureDescription')?.setValue(this.data.procedureDescription);
      this.procedureDetailsForm.get('procedureIsDepricated')?.setValue(this.data.procedureIsDepricated);
    }
  }

  formData() {

    this.procedureDetailsForm = this.fb.group({
      procedureCode: ['', [Validators.required, Validators.minLength(2)]],
      procedureIsDepricated: ['', [Validators.required]],
      procedureDescription: new FormControl(''),
    })

  }


}
