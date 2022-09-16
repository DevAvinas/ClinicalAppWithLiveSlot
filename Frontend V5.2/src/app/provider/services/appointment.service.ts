import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { PatientMaster } from '../models/PatientMaster';
import { AuthService } from 'src/app/Auth/auth.service';
import { ProviderMaster } from '../models/ProviderMaster';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  getSlotsOfPhy(phyId:string,apptDate:string):Observable<any> {
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/slots/"+phyId+"/"+apptDate);
   }

   createAppt(newAppt: Appointment){
    console.log("Appoo: "+ newAppt);
    return this.http.post<Appointment>("http://127.0.0.1:8084/api/private/appt/newappt",newAppt);
   }

   getAllPatients():Observable<PatientMaster[]>{
    let token=this.authService.getToken();
    return this.http.get<PatientMaster[]>("http://127.0.0.1:8082/api/private/allpatient",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)})
   }

   getAllPhysician():Observable<any> {
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8087/api/private/allphysicians/",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
   }

   checkPatientAppointmentClash(patId:string,apptDate:string,apptFrTime: string):Observable<any>{
    let token=this.authService.getToken();
    console.log("Inside Serrr:"+apptFrTime+"data: "+apptDate);
    return this.http.get<any>("http://127.0.0.1:8084/api/private/appt/checkPatientAppointmentClash/"+patId+"/"+apptDate+"/"+apptFrTime);
   }

   updateAppt(meetId:number,updatedAppt: Appointment){
    return this.http.put<Appointment>("http://127.0.0.1:8084/api/private/appt/updateAppt/"+ meetId , updatedAppt);
  }

  getbypatientid(patid:any):Observable<PatientMaster>{
    let token=this.authService.getToken();
    return this.http.get<PatientMaster>("http://127.0.0.1:8081/api/private/getbypatientid/"+patid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  getbyproviderid(phyid:any):Observable<ProviderMaster>{
    let token=this.authService.getToken();
    return this.http.get<ProviderMaster>("http://127.0.0.1:8087/api/private/getbyproviderid/"+phyid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}


