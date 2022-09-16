import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientMaster } from '../Models/PatientMaster';
import { PatientDetails } from '../Models/PatientDetails';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMasterService {
  
  
  constructor(private http:HttpClient,private authService:AuthService) { }

  fetchLocation(postalcode:string):Observable<any> {
    return this.http.get<any>("http://127.0.0.1:4201/postalcodes/"+postalcode);
  }

  //Registration of a new Patient
   addUser(patientMaster:PatientMaster):Observable<PatientMaster> {
    return this.http.post<PatientMaster>("http://127.0.0.1:8081/api/public/register",patientMaster);
   }

  getPatients(): Observable<PatientMaster[]> {
    return this.http.get<PatientMaster[]>("http://127.0.0.1:3000/patientMaster");
  }

  //Saving Patient Details
  savePatientDetails(patientDetails:PatientDetails):Observable<PatientDetails>{
    let token=this.authService.getToken();
    return this.http.post<PatientDetails>("http://127.0.0.1:8081/api/private/savedemo",patientDetails,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  updatePassword(patientMaster:PatientMaster,index:number):Observable<PatientMaster> {
    return this.http.put<PatientMaster>("http://127.0.0.1:3000/patientMaster/"+index,patientMaster);
  }
  findByPatientId(patientid:any):Observable<any> {
    return this.http.get<any>("http://localhost:8082/api/public/findbyId/"+patientid);
  }

}
