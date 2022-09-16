import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProvideMasterService {


  constructor(private http:HttpClient,private authService: AuthService) { }
  getAllPhysician():Observable<any> {
    let token=this.authService.getToken();

    return this.http.get<any>("http://127.0.0.1:8087/api/private/allphysicians/",{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
   }

  
}
