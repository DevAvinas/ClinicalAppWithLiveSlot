import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PatientVisitDetails } from 'src/app/provider/models/PatientVisitDetails';
import { UpcomingAppointments } from 'src/app/provider/models/UpcomingAppointments';
import { Observable } from 'rxjs';
import { AppointmentRequests } from '../models/Appointmentrequests';
import { AuthService } from 'src/app/Auth/auth.service';
import { AppointmentEditHistory } from '../models/provideredithistory';


const baseUrl = 'http://localhost:8087/api/private/vital';
@Injectable({
  providedIn: 'root'
})
export class PatientVisitDetailsService {



  constructor(private http:HttpClient,private authService:AuthService) { }

  addUser(patientMaster:PatientVisitDetails):Observable<any> {
    console.log(patientMaster);
    console.log(patientMaster.meetingid);
  
 let token=this.authService.getToken();
  
 

    return this.http.post<any>("http://localhost:8087/api/private/savevitals",patientMaster,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  checkUser(meetid:any):Observable<any> {
   
 let token=this.authService.getToken();

    return this.http.get<any>("http://localhost:8087/api/private/checkvital/"+meetid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }


  getPatients(): Observable<PatientVisitDetails[]> {
    // perform the appropriate API call here that will get the books from the server
    return this.http.get<PatientVisitDetails[]>("http://127.0.0.1:3000/PatientVisitDetails");
  }

  getUpcomingAppointments(phyid:string):Observable<AppointmentRequests[]>{
    console.log("lp"+phyid)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/ApptsAndStatusOfPhy/"+phyid+"/confirm");
  }
  getAppointmentsByStatusComplete():Observable<AppointmentRequests[]>{
    console.log("status------------->"+status)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/getaptbystatus/"+"/complete");
  }
  getRequestedAppointmentsByStatus():Observable<AppointmentRequests[]>{
    console.log("status------------->"+status)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/getaptbystatus/"+"/request");
  }
  getUpcomingAppointmentsByStatus():Observable<AppointmentRequests[]>{
    console.log("status------------->"+status)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/getaptbystatus/"+"/confirm");
  }

  getUpcomingAppointmentnew(phyid:string):Observable<AppointmentRequests[]>{
    console.log("lp"+phyid)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/ApptsAndStatusOfPhy/"+phyid+"/confirm");
  }

  getOldAppointmentnew(phyid:string):Observable<AppointmentRequests[]>{
    console.log("lp"+phyid)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/oldappts/"+phyid+"/complete");
  }
  getUpcomingAppointmentrequests(phyid:string):Observable<AppointmentRequests[]>{
    
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/getReqslots/"+phyid+"/request");
  }
  get(id: any):Observable<any>{
      
 let token=this.authService.getToken();
    return this.http.get<any>(`${baseUrl}/${id}`,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  addStatus(patientMaster:AppointmentRequests,meetId:number):Observable<any> {
    console.log("ggju"+patientMaster.changedbyId);
    console.log(patientMaster.meetId);
    return this.http.put<any>("http://localhost:8084/api/private/appt/acceptappt/"+meetId,patientMaster);
  }
  declineStatus(patientMaster:AppointmentRequests,meetId:number):Observable<any> {
    console.log("ggju"+patientMaster.changedbyId);
    console.log(patientMaster.meetId);
    return this.http.put<any>("http://localhost:8084/api/private/appt/acceptappt/"+meetId,patientMaster);
  }
  addcompletedStatus(patientMaster:AppointmentRequests,meetId:number):Observable<any> {
    console.log("ggju"+patientMaster.changedbyId);
    console.log(patientMaster.meetId);
    return this.http.put<any>("http://localhost:8084/api/private/appt/completeappt/"+meetId,patientMaster);
  }

  getstatusfornotification(phyid:string):Observable<AppointmentRequests[]>{
    console.log("lp"+phyid)
    console.log("notification page")
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/providernotifications/"+phyid+"/decline"+"/reschedule");
  }
  getbymeetid(meetid:any):Observable<AppointmentRequests>{
    return this.http.get<AppointmentRequests>("http://localhost:8084/api/private/appt/appointment/"+meetid);

  }
  getbyPhysicianId(phyid:any):Observable<AppointmentEditHistory[]>{
    return this.http.get<AppointmentEditHistory[]>("http://localhost:8084/api/private/appt/provider/history/"+phyid);

  }
  
}
