import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { DiagnosisMaster } from 'src/app/provider/models/DiagnosisMaster (1)';
import { PrescDiagnosis } from 'src/app/provider/models/PrescDiagnosis';


@Injectable({
  providedIn: 'root'
})


export class DiagnosisMasterService {

  constructor(private http:HttpClient,private authService:AuthService) {
  
   }
  
    
 fetchData(diagnosisCode:string): Observable<any> {
  let token=this.authService.getToken();
   // perform the appropriate API call here that will get the books from the server
   return this.http.get<any>("http://localhost:8085/api/private/provider/all/diagnosis/"+diagnosisCode,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
 }
 fetchData1(diagnosisDescription:string): Observable<any> {
  let token=this.authService.getToken();
  // perform the appropriate API call here that will get the books from the server
  return this.http.get<any>("http://localhost:8085/api/private/diagnosis?DiagnosisDescription="+diagnosisDescription,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}
adddDiagnosis(diagnosisMaster:PrescDiagnosis):Observable<PrescDiagnosis> {
  let token=this.authService.getToken();
  console.log("service"+diagnosisMaster)
  return this.http.post<PrescDiagnosis>("http://localhost:8085/api/private/adddiagnosis",diagnosisMaster,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}
getData():Observable<any>{
  let token=this.authService.getToken();
  return this.http.get<any>("http://localhost:8085/api/private/provider/all/diagnosis",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}

findDiagnosisByMeeingId(meetingid:number):Observable<PrescDiagnosis[]>{
  let token=this.authService.getToken();
  return this.http.get<PrescDiagnosis[]>("http://localhost:8085/api/private/findDiagnosisByMeeingId/"+meetingid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}

delete(id: number): Observable<PrescDiagnosis> {
  let token = this.authService.getToken();
  console.log("id is ----" + id);
  return this.http.delete<PrescDiagnosis>("http://localhost:8085/api/private/delete/" + id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
}
}
