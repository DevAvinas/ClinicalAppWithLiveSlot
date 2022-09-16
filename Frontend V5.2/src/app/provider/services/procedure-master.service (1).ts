import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { PrescProcedure } from 'src/app/provider/models/PrescProcedure';
import { ProcedureMaster } from 'src/app/provider/models/ProcedureMaster (1)';

@Injectable({
  providedIn: 'root'
})
export class ProcedureMasterService {

  constructor(private http:HttpClient,private authService:AuthService,) { }

  fetchData(procedureCode:string): Observable<any> {
    let token=this.authService.getToken(); 
    return this.http.get<any>("http://localhost:8085/api/private/provider/all/procedure/"+procedureCode,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  fetchData1(procedureDescription:string): Observable<any> {
   // perform the appropriate API call here that will get the books from the server
   let token=this.authService.getToken(); 
   return this.http.get<any>("http://localhost:8085/api/private/procedure?ProcedureDescription="+procedureDescription,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
   
   //GET /posts?title=json-server&author=typicode
 }
 adddProcedure(procedureMaster:PrescProcedure):Observable<PrescProcedure> {
  let token=this.authService.getToken(); 
  return this.http.post<PrescProcedure>("http://localhost:8085/api/private/save/procedure",procedureMaster,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}
getData():Observable<any>{
  let token=this.authService.getToken(); 
  return this.http.get<any>("http://localhost:8085/api/private/provider/all/procedure",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}
findProcedureByMeeingId(meetingid:number):Observable<PrescProcedure[]>{
  let token=this.authService.getToken();
  return this.http.get<PrescProcedure[]>("http://localhost:8085/api/private/findprocedureByMeeingId/"+meetingid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
}

delete(id: number): Observable<PrescProcedure> {
  let token = this.authService.getToken();
  console.log("id is ----" + id);
  return this.http.delete<PrescProcedure>("http://localhost:8085/api/private/delete/proc/" + id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
}


 }

