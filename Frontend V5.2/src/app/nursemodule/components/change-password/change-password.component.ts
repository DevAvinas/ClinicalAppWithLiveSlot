import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { changePassword } from 'src/app/Models/ChangePassword';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  //private changePasswordService:ChangePasswordService
  constructor(private patientService: PatientMasterService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.formData()
  }

  ngOnInit(): void {
  }
  fromdb: PatientMaster = new PatientMaster();
  fromdbArr: PatientMaster[] = [];
  verify:boolean=false;
  form!: FormGroup;
  submitted = false;
 // verify = false;
  user!: changePassword;

  // changePassword() {
  //   this.submitted=true;
  //   if(this.form.invalid) {
  //     return;
  //   }
  //   alert("Your Password has been changed Successfully!!!!!!!!");

  //  }

  get f() {
    return this.form.controls;
  }

  formData() {
    this.form = this.formBuilder.group

      ({
        newpassword: new FormControl('', [Validators.required, Validators.pattern(''), Validators.minLength(6)]),
        oldpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required, Validators.email]),

      })
  }


  changePassword() {
    

    this.user = this.form.value;
    console.log(this.user);
    this.patientService.getPatients().subscribe(fromdbArr => {
      this.fromdbArr = fromdbArr;


      

      for (let index = 0; index < fromdbArr.length; index++) {

       

          if (this.user.email === fromdbArr[index].email) {
            
            console.log("Correct email");
            if (this.user.oldpassword === fromdbArr[index].password) {
              console.log("Correct password");
              fromdbArr[index].password=this.user.newpassword;
              this.patientService.updatePassword(fromdbArr[index],index+1).subscribe(data=>console.log(data));
              console.log(index);
              this.verify=true;
              console.log(this.verify);
            }
          }
        }
          
            if(this.verify==true){
              alert("The password changed ");

             
              this.router.navigate(['/', 'login'])
            }
            else{
              console.error("Incorrect Old Password.Please enter correct password to change your password");
              alert("Incorrect username or password please try again");
          }
        
       
        })
      }
  }

