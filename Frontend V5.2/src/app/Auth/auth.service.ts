import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginUser } from '../Models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  errorMsg:String='';

  constructor(private http:HttpClient,private router: Router) { }

  patientLogin(user:LoginUser):Observable<any> {
     return this.http.post<any>('http://127.0.0.1:8081/authenticate/patient',user).pipe(
      catchError(error => {
        console.error("Error: "+error.message+"------------"+error.type);
          if (error.error instanceof ErrorEvent) {
              this.errorMsg = `Error: ${error.error.message}`;
          } else {
              this.errorMsg = this.getServerErrorMessage(error);
          }
          return throwError(this.errorMsg);
      })
  );
  }
  providerLogin(user:LoginUser):Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8081/authenticate/provider',user).pipe(
     catchError(error => {
       console.error("Error: "+error.message+"------------"+error.type);
         if (error.error instanceof ErrorEvent) {
             this.errorMsg = `Error: ${error.error.message}`;
             console.error(error);
            
         } else {
             this.errorMsg = this.getServerErrorMessage(error);
             console.error(error);

         }
         return throwError(this.errorMsg);
     })
 );
 } 
 
 
 checkProviderOtpFlag(user:LoginUser): Observable<any> {
     // perform the appropriate API call here that will get the books from the server
     return this.http.post<any>("http://127.0.0.1:8087/api/public/checkProviderOtpFlag",user);
   }

   resetProviderPassword(user:LoginUser): Observable<any>{
     return this.http.post<any>("http://127.0.0.1:8087/api/public/resetProviderPassword",user);
   }
 
  storeToken(tokenvalue:string) {
    sessionStorage.setItem("Token",tokenvalue);
  }
  
  getToken() {
    return sessionStorage.getItem("Token");
  }

  isLoggedIn():any {
    return !!sessionStorage.getItem("Token");
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/', 'login']);
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
        case 401: {
          return `${error.error.message}`;
      }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}

}
