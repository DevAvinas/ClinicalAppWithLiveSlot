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

  fetchDatabyDrugid(Drug_ID:string): Observable<any> {
    let token=this.authService.getToken();
   // perform the appropriate API call here that will get the books from the server
   return this.http.get<any>("http://localhost:8085/api/private/getMedicationDetailsbyid/"+Drug_ID,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
 }
 fetchData1(Drug_Name:string): Observable<any> {
  // perform the appropriate API call here that will get the books from the server
  let token=this.authService.getToken();
  return this.http.get<any>("http://localhost:8085/api/private/getMedicationDetailsbyname?drug_name="+Drug_Name,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  
 
  }
  //GET /posts?title=json-server&author=typicode

  //GET /posts?id=1&id=2

  getData():Observable<MedicationDetails[]>{
    let token=this.authService.getToken();
    return this.http.get<MedicationDetails[]>("http://localhost:8085/api/private/getMedicationDetails",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  addUser(user:MedicationDetailsOutput):Observable<MedicationDetailsOutput> {
    let token=this.authService.getToken();
    console.log("useroutput"+Object.values(user)[1]);
    return this.http.post<MedicationDetailsOutput>("http://localhost:8085/api/private/addmedicationdetails",user,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  getDataoutput():Observable<any>{
    return this.http.get<any>("http://127.0.0.1:3000/MedicationDetailsOutput");
  }

  getUpcomingAppointmentnew(phyid:any):Observable<AppointmentRequests[]>{
    console.log("lpnew"+phyid)
    return this.http.get<AppointmentRequests[]>("http://localhost:8084/api/private/appt/oldappts/"+phyid+"/confirm");
  }

  get(id: any):Observable<any>{
    console.log("mediid"+id);
    const baseUrl = 'http://localhost:8085/api/private/getmedicationoutput';
    let token=this.authService.getToken();
       return this.http.get<any>(`${baseUrl}/${id}`,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
     }
     delete(id: number): Observable<MedicationDetailsOutput> {
      let token = this.authService.getToken();
      console.log("id is ----" + id);
      return this.http.delete<MedicationDetailsOutput>("http://localhost:8085/api/private/delete/medi/" + id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
    }
}

