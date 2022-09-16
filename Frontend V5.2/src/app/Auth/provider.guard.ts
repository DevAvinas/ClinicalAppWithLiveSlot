import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MyRoutingService } from './my-routing.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {

  constructor(private authService: AuthService, private route: MyRoutingService,private jwtHelper: JwtHelperService) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.authService.getToken()!=null){

        let token = this.authService.getToken();
        let tokenPayload = this.jwtHelper.decodeToken(token);
        let sub: string = tokenPayload['sub'];
        console.log(sub.split(',')[3].split('=')[1]);
        let role: string = sub.split(',')[3].split('=')[1];
        
        if(role=="Doctor") return true;
        else {
          this.route.openlogin();
          return false;
        }
      }
      else {
        this.route.openlogin();
        return false;
      }
    
    }
  
}
