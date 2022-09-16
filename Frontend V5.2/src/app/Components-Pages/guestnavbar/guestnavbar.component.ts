import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { SidebarService } from 'src/app/provider/services/sidebar.service';

@Component({
  selector: 'app-guestnavbar',
  templateUrl: './guestnavbar.component.html',
  styleUrls: ['./guestnavbar.component.css']
})
export class GuestnavbarComponent implements OnInit {

  
  patientId:any;

  constructor(public authService: AuthService,private dialog:MatDialog,
    public sidebarservice:SidebarService) {}

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
  status: boolean = true;
  clickEvent(){
      this.status = !this.status; 
      this.sidebarservice.setSidebarStatus(this.status);
      
  }
 
}


