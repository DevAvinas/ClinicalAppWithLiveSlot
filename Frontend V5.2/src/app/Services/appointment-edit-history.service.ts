import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentEditHistoryService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getHistory(id:string):Observable<any>{
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/history/"+id,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  getHistoryByPatientId(patientid:string):Observable<any>{
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/patient/history/"+patientid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}
