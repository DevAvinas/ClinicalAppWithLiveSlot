import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { dataBound } from '@syncfusion/ej2-angular-schedule';
import { ProviderMaster } from '../../Model/ProviderMaster';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-provider-registration',
  templateUrl: './provider-registration.component.html',
  styleUrls: ['./provider-registration.component.css']
})
export class ProviderRegistrationComponent implements OnInit {
  ageValidation:Date;
  constructor(private route: ActivatedRoute,private router: Router,private serv:AdminService, private formBuilder:FormBuilder,private dialogRef: MatDialogRef<ProviderRegistrationComponent>,private _snack: MatSnackBar) { 
    this.formData()
  }
  ngOnInit(): void {
    
  }

  form!:FormGroup;
  submitted=false;
  
   provider:ProviderMaster = new ProviderMaster();
   providers:ProviderMaster[]=[];
  

  addProvider() {
    this.submitted=true;
    if(this.form.invalid) {
      return;
    }
    this.populateModel();
    let message;
    // this.provider.dor=new Date().toString();
    this.serv.registerProvider(this.provider).subscribe(resp=> 
      { 
         message= resp['message'];
        if(message==="Provider already exists") this._snack.open(message,"",{
          duration: 3000
        });
        else  this._snack.open("Provider Registered Successfully with ID: "+ message ,"Ok",{
          duration: 3000
        });
    });
    this.dialogRef.close(message);
  }

  populateModel(){
    this.provider.email=this.form.get('email')?.value;
    this.provider.title=this.form.get('title')?.value;
    this.provider.firstname=this.form.get('firstname')?.value;
    this.provider.lastname=this.form.get('lastname')?.value;
    this.provider.dob=this.form.get('dob')?.value;
    this.provider.role=this.form.get('role')?.value;
    // this.provider.dor=new Date().toString();
    this.provider.otpFlag=true;
    this.provider.active=true;
    console.log("Populating Model: "+this.provider);
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
      email: new FormControl('',[Validators.required,Validators.pattern("^[A-Za-z0-9._%+-]+@ctgh.com$")]),
      dob: new FormControl('',[Validators.required,Validators.minLength(6)]),
      role: new FormControl('',[Validators.required])
    })
  
  }

}
