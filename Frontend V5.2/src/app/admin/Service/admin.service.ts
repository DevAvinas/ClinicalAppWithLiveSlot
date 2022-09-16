import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ProviderMaster } from '../Model/ProviderMaster';
import { AuthService } from 'src/app/Auth/auth.service';

import { ProcedureMaster } from '../Model/ProcedureMaster';
import { DiagnosisMaster } from '../Model/DiagnosisMaster';
import { MedicationMaster } from '../Model/MedicationMaster';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  
  errorMsg:String='';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // getPatients(): Observable<any> {
  //   return this.http.get<any>("http://127.0.0.1:3000/patientMaster");
  // }

  getPatients(): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8081/api/private/allpatient", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  // getProviders(): Observable<any> {
  //   return this.http.get<any>("http://127.0.0.1:3000/ProviderMaster");
  // }

  getProviders(): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8087/api/private/all/provider", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  // updatePatientStatus(patient_id:string,patient:any): Observable<any> {
  //   return this.http.put<any>("http://127.0.0.1:3000/patientMaster/"+patient_id,patient);
  // }

  updatePatientStatus(email: string, status: string): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8081/api/public/changestatus/" + email + "/" + status, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  // updateEmpStatus(provider_id:string,employee:any): Observable<any> {
  //   return this.http.put<any>("http://127.0.0.1:3000/ProviderMaster/"+provider_id,employee);
  // }


  updateEmpStatus(email: string, status: string): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8087/api/public/changestatus/" + email + "/" + status, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }


  // resetPassword(provider_id:string,employee:any): Observable<any> {
  //   return this.http.put<any>("http://127.0.0.1:3000/ProviderMaster/"+provider_id,employee);
  // }

  resetPassword(email: string): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8087/api/private/adminResetPassword/" + email, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  deleteInvalidAttemptCounts(email: string): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8081/authenticate/deleteLoginAttemptCounter/" + email, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  // addUser(providerMaster:ProviderMaster): Observable<any>{
  //   return this.http.post<ProviderMaster>("http://127.0.0.1:3000/ProviderMaster",providerMaster);
  // }

  registerProvider(provider: ProviderMaster): Observable<any> {
    return this.http.post<any>("http://127.0.0.1:8087/api/public/register/provider", provider);
  }

  countOfAppts(): Observable<number> {
    return this.http.get<number>("http://127.0.0.1:8084/api/private/appt/countOfAppts");
  }

  countOfPatients(): Observable<number> {
    let token = this.authService.getToken();
    return this.http.get<number>("http://127.0.0.1:8081/api/private/countOfPatients", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }
  countOfDoctors(): Observable<number> {
    let token = this.authService.getToken();
    return this.http.get<number>("http://127.0.0.1:8087/api/private/countOfDoctors", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }
  countOfNurse(): Observable<number> {
    let token = this.authService.getToken();
    return this.http.get<number>("http://127.0.0.1:8087/api/private/countOfNurse", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  ///DataMgmt Services

  getAllDiagnosis(): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/provider/all/diagnosis", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  getAllProcedure(): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/provider/all/procedure", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  getAllMedication(): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/getMedicationDetails", { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }



  saveDiagnosis(diagnosisMaster: DiagnosisMaster) : Observable<any>{
    let token = this.authService.getToken();
    console.log("Service Diagnosis: "+Object.values(diagnosisMaster));
    return this.http.post<any>("http://127.0.0.1:8085/api/private/provider/diagnosis", diagnosisMaster, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  saveProcedure(procedureMaster: ProcedureMaster) : Observable<any>{
    let token = this.authService.getToken();
    return this.http.post<any>("http://127.0.0.1:8085/api/private/provider/procedure", procedureMaster, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }

  saveMedication(medicationMaster: MedicationMaster) : Observable<any>{
    let token = this.authService.getToken();
    return this.http.post<any>("http://127.0.0.1:8085/api/private/provider/mastermedication", medicationMaster, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) });
  }



  deleteDiagnosis(id:number): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/provider/diagnosis/deletebyid/"+id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) })
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteProcedure(id:number): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/provider/procedure/deletebyid/"+id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) })
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  deleteMedication(id:string): Observable<any> {
    let token = this.authService.getToken();
    return this.http.get<any>("http://127.0.0.1:8085/api/private/provider/medication/deletebyid/"+id, { 'headers': new HttpHeaders().set('Authorization', `Bearer ${token}`) })
    .pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        case 500: {
          return `${error.error.message}`;
      }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}


  
  


}
