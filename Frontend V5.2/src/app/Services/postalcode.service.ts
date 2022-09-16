import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostalcodeService {

  constructor(private http:HttpClient) { }

  fetchDataGeoNamesAPI(postalcode:string):Observable<any> {
    return this.http.get<any>(`http://secure.geonames.org/postalCodeSearchJSON?postalcode=${postalcode}&maxRows=1&username=avi136016`);
  }
  fetchDataCountryCodeJSON():Observable<any> {
    return this.http.get<any>('./assets/CountryCodes.json');
  }
}
