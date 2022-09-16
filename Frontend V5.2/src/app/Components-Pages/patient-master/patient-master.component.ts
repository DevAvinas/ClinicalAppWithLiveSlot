
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { Validation } from './validation';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-master',
  templateUrl: './patient-master.component.html',
  styleUrls: ['./patient-master.component.css']
})
export class PatientMasterComponent implements OnInit {

  constructor(private _snack:MatSnackBar,private route: ActivatedRoute,private router: Router,private patientService:PatientMasterService, private formBuilder:FormBuilder) { 
    this.formData()
  }

  form!:FormGroup;
  submitted=false;
  
  patient:PatientMaster = new PatientMaster();
  patients:PatientMaster[]=[];


  addPatient() {
    this.submitted=true;
    if(this.form.invalid) {
      return;
    }
    this.populateModel();
    this.patientService.addUser(this.patient).subscribe(obj => {
      console.log("In Subscribe");
      console.log(obj);
      this._snack.open(("Registered Successfully and details forwarded to your registered e-mail ! "),"Ok",{
        duration: 6000
      });
      this.router.navigate(['/', 'login'])
      
   });
  }

  populateModel(){
    this.patient.email=this.form.get('email')?.value;
    this.patient.title=this.form.get('title')?.value;
    this.patient.firstname=this.form.get('firstname')?.value;
    console.log("------------------");
    console.log(this.form.get('firstname')?.value);
    console.log( this.patient.firstname);
    this.patient.lastname=this.form.get('lastname')?.value;
    this.patient.dob=this.form.get('dob')?.value;
    this.patient.password=this.form.get('password')?.value;
    console.log(this.patient);
  }

  get f() {
    return this.form.controls;
  }

  formData() {
    this.form = this.formBuilder.group
   
    ({
      title: new FormControl('',[Validators.required]),
      firstname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      dob: new FormControl('',[Validators.required,Validators.minLength(6)]),
    //  phoneNo: new FormControl('',[Validators.required, Validators.minLength(10)]),
    //  password: new FormControl('',[Validators.required,Validators.pattern('new RegExp("^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,}))"'),Validators.minLength(8)]),
    password: new FormControl('',[Validators.required,Validators.pattern(''),Validators.minLength(8)]),
    confirmpassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    },{validators:[Validation.match('password','confirmpassword')]})
  }


  ngOnInit(): void {
  }

}
