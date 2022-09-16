import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { PatientMaster } from '../Models/PatientMaster';
import { DashboardService } from '../Services/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthRoutingService {
  username = "";
  userEmail = "";
  user!: PatientMaster;

  constructor(private dashboardService: DashboardService, private router: Router,private authService: AuthService,) { }

  isPatientOld(id:string):Observable<any>{
     let flag:Boolean=false;
    this.dashboardService.email_ob.subscribe((email: string) => this.userEmail = email);
    this.dashboardService.getPatientDetailsForRouting(this.userEmail).subscribe((data) => {
      this.user = data[0];
    console.log("--------------------------User data---------------------------")
    console.log(this.user);
    // this.username = this.user.firstname + " " + this.user.lastname;
    this.setPatientObjectInSessionStorage(this.user);
    //sessionStorage.setItem('User', JSON.stringify(this.user));
    console.log(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id);
    this.dashboardService.checkPatientDetails(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id).subscribe(data=>{
      console.log(data);
      if(data){
        console.log("new User");
        flag=false;
      }
      else{
        flag=true;
      }
    })
  })
        return of({old:flag});
  }
  setPatientObjectInSessionStorage(obj:any){
    sessionStorage.setItem('User', JSON.stringify(obj));

  }

}
