import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { MyRoutingService } from '../Auth/my-routing.service';
import { PatientMaster } from '../Models/PatientMaster';
import { DashboardService } from '../Services/dashboard.service';
import { PatientAuthRoutingService } from './patient-auth-routing.service';

@Injectable({
  providedIn: 'root'
})
export class PatientModuleGuard implements CanActivate {
  
  username = "";
  userEmail = "";
  user!: PatientMaster;
  oldUserFlag=false;
  constructor(private dashboardService: DashboardService, private router: Router,private authService: AuthService, private route: PatientAuthRoutingService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise(res => {
      let token = this.authService.getToken();

      if(token==null)
      {
        this.router.navigate(['/login'])
      }
    
      this.dashboardService.email_ob.subscribe((email: string) =>{
        console.log(JSON.parse(sessionStorage.getItem('email') || ''));
      if(email.length==0){
        this.userEmail=JSON.parse(sessionStorage.getItem('email') || '');
      }else
      this.userEmail = email});
      console.log(this.userEmail)
      this.dashboardService.getPatient(JSON.parse(sessionStorage.getItem('email') || '')).subscribe((data) => {
        this.user = data;
      console.log("--------------------------User data---------------------------")
      console.log(this.user);
      this.username = this.user.firstname + " " + this.user.lastname;
      sessionStorage.setItem('User', JSON.stringify(this.user));
      console.log(sessionStorage.getItem('User'));
      //this.route.isPatientOld(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id)
      this.dashboardService.checkPatientDetails(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id).subscribe(data=>{
        console.log(data[0])
        this.oldUserFlag=data[0]
        console.log(this.oldUserFlag)
      if (!this.oldUserFlag) {
        // this.route.openlogin();
        this.router.navigate(['patient-details']);
        return res(false);
      }else{
        // this.router.navigate(['/patient/patient-dashboard'])

        return res(true);
          
      }
    });
      })
    })
    

    }
}
