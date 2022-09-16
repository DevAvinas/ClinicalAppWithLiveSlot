import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { Validation } from './validation';
import { Router, ActivatedRoute } from '@angular/router';
import { changePassword } from '../../../Models/ChangePassword';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePwdDto:changePassword = new changePassword();
  patients:PatientMaster[]=[];
  form!:FormGroup;
  submitted=false;
  constructor(private _snack:MatSnackBar,private route: ActivatedRoute,private router: Router,private patientService:PatientMasterService, private formBuilder:FormBuilder) { 
    this.formData()
  }


  



  addPatient() {
    this.submitted=true;
    if(this.form.invalid) {
      return;
    }
    this.populateModel();
    this.patientService.updatePasswordNew(this.changePwdDto).subscribe(obj => {
      console.log("In Subscribe");
      console.log(obj);
      if(obj==1){
        
        this._snack.open(("Password updated successfully"),"Ok",{
          duration: 3000
        });
      }
      else{
        this._snack.open(("Incorrect Old Password"),"Ok",{
          duration: 3000
        });
      }

      // this.router.navigate(['/', 'login'])
      
   });
  }

  populateModel(){
    this.changePwdDto.email=this.form.get('email')?.value;


    this.changePwdDto.oldpassword=this.form.get('oldpassword')?.value;
    this.changePwdDto.newpassword=this.form.get('password')?.value;

    console.log(this.changePwdDto);
  }

  get f() {
    return this.form.controls;
  }

  formData() {
    this.form = this.formBuilder.group
   
    ({

      email: new FormControl(JSON.parse(sessionStorage.getItem('User') || '{}').email,[Validators.required,Validators.email]),

    //  phoneNo: new FormControl('',[Validators.required, Validators.minLength(10)]),
    //  password: new FormControl('',[Validators.required,Validators.pattern('new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,}))"'),Validators.minLength(8)]),
    oldpassword: new FormControl('',[Validators.required,Validators.pattern(''),Validators.minLength(5)]),

    password: new FormControl('',[Validators.required,Validators.pattern(''),Validators.minLength(8)]),
    confirmpassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    },{validators:[Validation.match('password','confirmpassword')]})
  }


  ngOnInit(): void {
    
  }

}
