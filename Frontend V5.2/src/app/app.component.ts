import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capstone-healthcare-frontend';
  status: boolean = true;
  userType="guest"

  clickEvent(){
      this.status = !this.status;       
  }
  getRole():string{
      var role;
      // if(sessionStorage.getItem('role')=='admin')
      // {
      //       return 'admin';
      // }
     
      if(sessionStorage.getItem('role')=='patient'){
        
        return 'patient';
      }
      else if(sessionStorage.getItem('role')=='Doctor' )
      {
      
        return 'Doctor';
      }

      else if(sessionStorage.getItem('role')=='Nurse')

      {

        return 'Nurse';

      }
      else if(sessionStorage.getItem('role')=='Admin'){
      
        return 'admin'
      }
      else{
        return 'guest';
      }

      


  }
}
