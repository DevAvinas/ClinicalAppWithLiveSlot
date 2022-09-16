import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { Appointment } from '../Models/Appointment';
import { PatientMaster } from '../Models/PatientMaster';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getSlotsOfPhy(phyId:string,apptDate:string):Observable<any> {
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/slots/"+phyId+"/"+apptDate);
   }

   createAppt(newAppt: Appointment){
     
     return this.http.post<Appointment>("http://127.0.0.1:8084/api/private/appt/newappt",newAppt);
   }

  
   getPhysicianByStatus(patientId:string,status:string):Observable<any> {
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/listphysician/"+patientId+"/"+status);
   }
   filterPhysician(patientId:string,status:string):Observable<any> {
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/listphysician/"+patientId+"/"+status);
   }
  
   getApptByMeetingId(id: string){
     
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/appointment/"+id);
  }
  getppointmentByStatus(patientid: string,status:string[]){
    let token=this.authService.getToken();

    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/status/"+patientid+"/"+status.toString(),{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  checkPatientAppointmentClash(patId:string,apptDate:string,apptFrTime: string):Observable<any>{
    let token=this.authService.getToken();
    console.log("Inside Serrr:"+apptFrTime+"data: "+apptDate);
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/checkPatientAppointmentClash/"+patId+"/"+apptDate+"/"+apptFrTime);
   }
   getbypatientid(patid:any):Observable<any>{
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8082/api/private/getbypatientid/"+patid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}
