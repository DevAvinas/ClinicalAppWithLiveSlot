import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Auth/auth.service';
import { LoginUser } from 'src/app/Models/LoginUser';
import { Validation } from '../provider-master/validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private _snack:MatSnackBar,private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public loginEmailData: any,private dialogRef: MatDialogRef<ResetPasswordComponent>,private authService:AuthService) {
    this.formData()
  }

  ngOnInit(): void {
    if(this.loginEmailData){
    this.form.get('email').setValue(this.loginEmailData);
    }
  }
 
  form!: FormGroup;
  submitted = false;
  user: LoginUser=new LoginUser();

  changePassword() {
    this.user.usernameOrEmail=this.loginEmailData;
    this.user.password=this.form.get('confirmpassword')?.value;

    this.authService.resetProviderPassword(this.user).subscribe(data=> {
      let resp=data['message'];
      if(resp==="Password was Reset Successfully") {
        //alert(resp);
        this._snack.open((resp),"Ok",{
          duration: 3000
        });
        this.dialogRef.close(this.user.password);
      }
      else 
      this._snack.open((resp),"Ok",{
        duration: 3000
      });
      //alert(resp);
    })
   }

  get f() {
    return this.form.controls;
  }

  formData() {
    this.form = this.formBuilder.group

      ({
        password: new FormControl('', [Validators.required, Validators.pattern(''), Validators.minLength(6)]),
        confirmpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        email: new FormControl('', [Validators.required, Validators.email]),
      },{validators:[Validation.match('password','confirmpassword')]})
  }


  
}
