import { Injectable } from '@angular/core';
import { PatientEmergencyDetails } from '../Models/PatientEmergencyDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../Models/Address';
import { AuthService } from '../Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdressService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  saveAddress(address:Address):Observable<Address>{
    let token=this.authService.getToken();
    return this.http.post<Address>("http://127.0.0.1:8081/api/private/saveaddress",address,{'headers': new HttpHeaders().set('Authorization',`Bearer ${token}`)});
  }
}
