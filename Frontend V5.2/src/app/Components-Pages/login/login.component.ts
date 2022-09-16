import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/Models/LoginUser';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  verify: boolean = false;
  loginform: FormGroup;
  loginattempt: number = 0;
  user!: LoginUser;
  token: string = '';
  message: string = '';
  tokenPayload: any;
  promptMessage!: string;
  display = "none";
  value: string;
  flag:boolean=false;
  flag1:boolean=false;
  flag2:boolean=true;

  resetForm: FormGroup;
  constructor(private _snack:MatSnackBar,private patientMasterService:PatientMasterService,private jwtHelper: JwtHelperService, private authService: AuthService, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router, private dashboardService: DashboardService, private dialog: MatDialog) {
    this.loginform = this.fb.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', [Validators.required]]
    });
    this.resetForm = this.fb.group({
      email: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    sessionStorage.clear();
  }
  onSubmit() {
    this.user = this.loginform.value;
    console.log(this.user);
    if (this.user.usernameOrEmail.includes("@ctgh.com")) {
      this.authService.checkProviderOtpFlag(this.user).subscribe(data => {
        let resp = data['message'];
        if (resp === "Invalid OTP") {
          this.promptMessage = resp;
          return;
        }
        else if (resp === "Provider Does not exist") {
          this.promptMessage = resp;
          return;
        }
        else if (resp === "Valid OTP") {
          console.log("Valid OTP");
          this.dialog.open(ResetPasswordComponent, { width: '100%', disableClose: true, data: this.user.usernameOrEmail }).afterClosed().subscribe(resp => {
            console.log("Password " + resp)
            this.user.password = resp;
            this.validatedProviderLogin();
          });
          // if(passwordChanged)this.validatedProviderLogin();
        }
        else if (resp === "No OTP") this.validatedProviderLogin();
        else       this._snack.open(resp,"Ok",{
          duration: 3000
        });
      })
    }
    //this.router.navigate(['/admin', 'dashboard']);
    else {
      this.authService.patientLogin(this.user).subscribe(data => {
        this.token = data['token'];
        this.message = data['message'];
        console.log("Token generated: " + this.token);
        console.log(this.jwtHelper.decodeToken(this.token))
        this.tokenPayload = this.jwtHelper.decodeToken(this.token);
        console.log(this.tokenPayload['sub']);
        let sub: string = this.tokenPayload['sub'];
        //console.log(  sub.split(',')[3].split(':')[1]);
        let role: string = sub.split(',')[3].split(':')[1];
        sessionStorage.setItem('role', role);
        console.log(sessionStorage.getItem('role'));
        console.log()
        this.authService.storeToken(this.token);
        // alert(this.message);
        this._snack.open(this.message,"Ok",{
          duration: 3000
        });
        this.dashboardService.loginToDashboard(this.user.usernameOrEmail);
        if (role == 'patient') {
          this.router.navigate(['patient/patient-dashboard'])
        }
        //this.router.navigate(['patient/patient-dashboard'])
      }, err => {
        this._snack.open(err,"Ok",{
          duration: 3000
        });
        this.loginform.reset();
      });
    }
  }
  validatedProviderLogin() {
    this.authService.providerLogin(this.user).subscribe(data => {
      this.token = data['token'];
      this.message = data['message'];
      console.log("Token generated: " + this.token);
      console.log(this.jwtHelper.decodeToken(this.token))
      this.tokenPayload = this.jwtHelper.decodeToken(this.token);
      console.log(this.tokenPayload['sub']);
      let sub: string = this.tokenPayload['sub'];
      console.log(sub.split(','));
      console.log(sub.split(',')[3].split('=')[1]);
      let role: string = sub.split(',')[3].split('=')[1];
      sessionStorage.setItem('role', role);
        console.log(sessionStorage.getItem('role'));
      console.log(role)
      this.authService.storeToken(this.token);
      this._snack.open(this.message,"Ok",{
        duration: 3000
      });
            this.dashboardService.loginToDashboard(this.user.usernameOrEmail);
      if (role == 'Admin') {
        this.router.navigate(['admin/dashboard']);
      }
      if (role == 'Doctor') {
        this.router.navigate(['provider/providerdashboard']);
      }
      if (role == 'Nurse') {
        this.router.navigate(['nurse/nursedashboard']);
      }
    }, err => {
      this._snack.open(err,"Ok",{
        duration: 3000
      });
      this.loginform.reset();
    })
  }
  openModal() {
  
    this.display = "block";
    this.flag=false;
    this.flag1=false;
    this.flag2=true;

  }
  
  onclick(){
    console.log( this.resetForm.get('email').value);
    if (this.resetForm.get('email').value.includes("@ctgh.com")) {
            this.flag1=true;
            this.flag2=false;
      }else{
        this.patientMasterService.resetPassword(this.resetForm.get('email').value)
        .subscribe(data=>{
          console.log(data);
          if(data==1){
        this.flag=true;
        this.flag2=false;
          }
        })

      }
  }
}