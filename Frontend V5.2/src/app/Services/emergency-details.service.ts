import { Injectable } from '@angular/core';
import { PatientEmergencyDetails } from '../Models/PatientEmergencyDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../Models/Address';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyDetailsService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  saveEmergencyDetils(patientEmergencyDetails:PatientEmergencyDetails):Observable<Address>{
    let token=this.authService.getToken();
    return this.http.post<Address>("http://127.0.0.1:8081/api/private/savemergencydetails",patientEmergencyDetails,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}
