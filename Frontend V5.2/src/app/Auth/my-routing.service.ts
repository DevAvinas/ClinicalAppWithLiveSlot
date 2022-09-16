import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class MyRoutingService {

  constructor(private route:Router) { }

 

  openlogin() {
    this.route.navigate(['/login']);
  }

  openHomePage() {
    this.route.navigate(['/homepage']);
  }

  openPatientdashboard() {
    // this.route.navigate(['/patient/patientdashboard']);
  }

  openProviderdashboard() {
    this.route.navigate(['/provider/providerdashboard']);
  }

  openNursedashboard() {
    this.route.navigate(['/nurse/nursedashboard']);
  }

  openAdmindashboard() {
    this.route.navigate(['/admin/admindashboard']);
  }


}
