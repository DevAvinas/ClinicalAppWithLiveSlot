import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { PatientMaster } from '../Models/PatientMaster';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax
import { LoginUser } from '../Models/LoginUser';

@Injectable({
  providedIn: 'root'
})


export class DashboardService {

  constructor(private http:HttpClient,private authService: AuthService) {
    
  }
  
  private loginEmail=new BehaviorSubject<string>("");
  email_ob=this.loginEmail.asObservable();
  loginToDashboard(email:string){
    sessionStorage.setItem('email', JSON.stringify(email));
    this.loginEmail.next(email);
  }


  private user=new BehaviorSubject<PatientMaster>(new PatientMaster());
  user_ob=this.user.asObservable();
  setUser(patientMaster:PatientMaster){
    this.user.next(patientMaster);
  }

  //Get Patient by Email 
  getPatient(email:string):Observable<any>{
    let flag:Boolean=true;
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8081/api/private/findbyemail/"+email,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  getProvider(email:string):Observable<any>{
    let flag:Boolean=true;
    let token=this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8087/api/private/find/provider/byemail/"+email,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }


  checkPatientDetails(patientId:string):Observable<boolean[]>{
    let token=this.authService.getToken();
    return forkJoin(this.http.get<boolean>("http://127.0.0.1:8081/api/private/checkDemo/" +patientId,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)}));
    //return this.http.get<boolean>("http://127.0.0.1:8081/api/private/checkDemo/" +patientId,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
  getPatientDetailsForRouting(email:string):Observable<any[]>{
    let flag:Boolean=true;
    let token=this.authService.getToken();
    console.log(email);
    return forkJoin( this.http.get<any>(`http://127.0.0.1:8081/api/private/findbyemail/${email}`,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)}));
  }

  checkProviderOtpFlag(user:LoginUser): Observable<any> {
    // perform the appropriate API call here that will get the books from the server
    return this.http.post<any>("http://127.0.0.1:8087/api/public/checkProviderOtpFlag",user);
  }
  resetProviderPassword(user:LoginUser): Observable<any>{
    return this.http.post<any>("http://127.0.0.1:8087/api/public/resetProviderPassword",user);
  }

  
}
