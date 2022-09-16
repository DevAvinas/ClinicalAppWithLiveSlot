import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient,private authService: AuthService) { }

  getVitalByMeetingId(meetingid:number):Observable<any>{
    let flag:Boolean=true;
    let token=this.authService.getToken();
    return this.http.get<any>("http://localhost:8087/api/private/vital/"+meetingid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }

  
  getConsultationDataByMeetingId(meetingid:number):Observable<any>{
    let flag:Boolean=true;
    let token=this.authService.getToken();
    return this.http.get<any>("http://localhost:8088/api/private/provider/report/"+meetingid,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}
