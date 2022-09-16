import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientMaster } from 'src/app/Models/ProvideMaster';
import { ProvideMasterService } from 'src/app/Services/provide-master.service';
import { Validation } from './validation';

@Component({
  selector: 'app-provider-master',
  templateUrl: './provider-master.component.html',
  styleUrls: ['./provider-master.component.css']
})
export class ProviderMasterComponent implements OnInit {

  constructor(private patientService:ProvideMasterService, private formBuilder:FormBuilder) { 
    this.formData()
  }
  ngOnInit(): void {
    
  }

  form!:FormGroup;
  submitted=false;
  
  // patient:ProvideMaster = new ProvideMaster();
  // patients:ProvideMaster[]=[];

  addProvider() {
    this.submitted=true;
    if(this.form.invalid) {
      return;
    }
    alert("You Have Successfully registered!!!!!!!!");
  
   }


  
  get f() {
    return this.form.controls;
  }

  formData() {
    this.form = this.formBuilder.group
   
    ({
      title:new FormControl('',[Validators.required]),
      firstname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      dob: new FormControl('',[Validators.required,Validators.minLength(6)]),
      role: new FormControl('',[Validators.required]),
      empid:new FormControl('',[Validators.required]),
      //password: new FormControl('',[Validators.required,Validators.pattern(''),Validators.minLength(6)]),
      //confirmpassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
      //active: new FormControl('',[Validators.required,Validators.minLength(6)]),
      //dor: new FormControl(1,[Validators.required, Validators.minLength(10)]),
    })
  
  }


 

}
