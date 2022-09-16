import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicationMaster } from '../../Model/MedicationMaster';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-medication-dialog',
  templateUrl: './medication-dialog.component.html',
  styleUrls: ['./medication-dialog.component.css']
})
export class MedicationDialogComponent implements OnInit {

  constructor(private _snack:MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: MedicationMaster, private dialogRef: MatDialogRef<MedicationDialogComponent>, private serv: AdminService, private fb: FormBuilder) {
    this.formData();
  }

  
  medicationDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  medicationMaster: MedicationMaster = new MedicationMaster();
  form: any;
  medication!: MedicationMaster[];
  tempdescription!: any;
  action="Add";

  saveMedicationDetails() {

    console.log("data---->" + this.medicationDetailsForm.value);
    this.submitted = true;
    if (this.medicationDetailsForm.invalid) {
      return;
    }

      this.populateModel();
    
    console.log("Da: "+Object.values(this.medicationMaster));
    this.serv.saveMedication(this.medicationMaster).subscribe(obj => {
      console.log(obj);
      if(!this.data){
      this._snack.open("Medication: "+ obj.drug_id+" added Successfully","Ok",{
        duration: 3000
      });
    }
    else{
      this._snack.open("Medication Id: "+ obj.drug_id +" is Updated Successfully","Ok",{
        duration: 3000
      });
    }      
      this.dialogRef.close("value submitted");
    });
  }

  populateModel() {
  
    this.medicationMaster.drug_id = this.medicationDetailsForm.get('drug_id')?.value;
    this.medicationMaster.drug_name = this.medicationDetailsForm.get('drug_name')?.value;
    this.medicationMaster.drug_brand_name = this.medicationDetailsForm.get('drug_brand_name')?.value;
    this.medicationMaster.drug_generic_name = this.medicationDetailsForm.get('drug_generic_name')?.value;
    this.medicationMaster.drug_form = this.medicationDetailsForm.get('drug_form')?.value;
  }
  

  get f() {
    return this.medicationDetailsForm.controls;
  }

 

  
  ngOnInit(): void {
    if(this.data){
      this.action="Update";
      this.medicationDetailsForm.get('drug_id')?.disable();
      this.medicationDetailsForm.get('drug_id')?.setValue(this.data.drug_id);
      this.medicationDetailsForm.get('drug_name')?.setValue(this.data.drug_name);
      this.medicationDetailsForm.get('drug_brand_name')?.setValue(this.data.drug_brand_name);
      this.medicationDetailsForm.get('drug_generic_name')?.setValue(this.data.drug_generic_name);
      this.medicationDetailsForm.get('drug_form')?.setValue(this.data.drug_form);
    }
  }

  formData() {

    this.medicationDetailsForm = this.fb.group({
      drug_id: ['', [Validators.required, Validators.minLength(2)]],
      drug_name: ['', [Validators.required]],
      drug_brand_name: ['', [Validators.required]],
      drug_generic_name: ['', [Validators.required]],
      drug_form: ['', [Validators.required]]

    })

  }


}
