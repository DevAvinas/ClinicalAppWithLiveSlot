import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getLocaleDateFormat } from '@angular/common';
import { MedicationDetails } from 'src/app/provider/models/MedicationDetails';
import { MedicationDetailsOutput } from 'src/app/provider/models/Medicationdetailsoutput';
import { AppointmentRequests } from 'src/app/provider/models/Appointmentrequests';
import { AuthService } from 'src/app/Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class MedicationDetailsService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  
  //GET /posts?title=json-server&author=typicode

  //GET /posts?id=1&id=2

  

  getUpcomingAppointmentnew(phyid:any):Observable<AppointmentRequests[]>{
    console.log("lpnew"+phyid)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/ApptsAndStatusOfPhy/"+phyid+"/confirm");
  }

  get(id: any):Observable<any>{
    console.log("mediid"+id);
    const baseUrl = 'http://localhost:8085/api/private/getmedicationoutput';
    let token=this.authService.getToken();
       return this.http.get<any>(`${baseUrl}/${id}`,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
     }
   
}

