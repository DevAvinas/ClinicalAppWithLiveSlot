import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Console } from 'console';
import { runInThisContext } from 'vm';
import { DiagnosisMaster } from '../../Model/DiagnosisMaster';
import { AdminService } from '../../Service/admin.service';


@Component({
  selector: 'app-diagnosis-master',
  templateUrl: './diagnosis-master.component.html',
  styleUrls: ['./diagnosis-master.component.css']
})
export class DiagnosisMasterComponent implements OnInit {

  diagnosisDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  diagnosisMaster: DiagnosisMaster = new DiagnosisMaster();
  form: any;
  diagnosis!: DiagnosisMaster[];
  tempdescription!: any;
  action="Add";
  saveDiagnosisDetails() {

    console.log("data---->" + this.diagnosisDetailsForm.value);
    this.submitted = true;
    if (this.diagnosisDetailsForm.invalid) {
      return;
    }

    if (!this.data) {
      this.populateModel(); 
    }
    else {
      this.populateDataModel();
    }
    console.log("ID: "+ this.diagnosisMaster.id);
    console.log("Da: "+Object.values(this.diagnosisMaster));
    this.serv.saveDiagnosis(this.diagnosisMaster).subscribe(obj => {
      console.log(obj);
      if(!this.data){
        this._snack.open("Diagnosis: "+ obj.diagnosisCode+" added Successfully","Ok",{
          duration: 3000
        });
      }
      else{
        this._snack.open("Diagnosis Code: "+ obj.diagnosisCode +" is Updated Successfully","Ok",{
          duration: 3000
        });
      } 
      this.dialogRef.close("value submitted");
    });
  }

  populateModel() {
    this.diagnosisMaster.diagnosisCode = this.diagnosisDetailsForm.get('diagnosisCode')?.value;
    this.diagnosisMaster.diagnosisDescription = this.diagnosisDetailsForm.get('diagnosisDescription')?.value;
    this.diagnosisMaster.diagnosisIsDepricated = this.diagnosisDetailsForm.get('diagnosisIsDepricated')?.value;
    console.log("dia:" + this.diagnosisMaster.diagnosisCode);
  }
  populateDataModel() {
    this.diagnosisMaster.id = this.data.id;
    console.log("Set ID: " + this.diagnosisMaster.id);
    this.diagnosisMaster.diagnosisCode = this.diagnosisDetailsForm.get('diagnosisCode')?.value;
    this.diagnosisMaster.diagnosisDescription = this.diagnosisDetailsForm.get('diagnosisDescription')?.value;
    this.diagnosisMaster.diagnosisIsDepricated = this.diagnosisDetailsForm.get('diagnosisIsDepricated')?.value;
  }

  get f() {
    return this.diagnosisDetailsForm.controls;
  }

  constructor(private _snack:MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DiagnosisMasterComponent>, private serv: AdminService, private fb: FormBuilder) {
    this.formData();
  }

  ngOnInit(): void {
    if(this.data){
      this.action="Update";
      console.log("Editing Data: " + Object.keys(this.data));
      this.diagnosisDetailsForm.get('diagnosisCode')?.setValue(this.data.diagnosisCode);
      this.diagnosisDetailsForm.get('diagnosisDescription')?.setValue(this.data.diagnosisDescription);
      this.diagnosisDetailsForm.get('diagnosisIsDepricated')?.setValue(this.data.diagnosisIsDepricated);
    }
  }

  formData() {

    this.diagnosisDetailsForm = this.fb.group({
      diagnosisCode: ['', [Validators.required, Validators.minLength(2)]],
      diagnosisIsDepricated: ['', [Validators.required]],
      diagnosisDescription: new FormControl(''),
    })

  }


}