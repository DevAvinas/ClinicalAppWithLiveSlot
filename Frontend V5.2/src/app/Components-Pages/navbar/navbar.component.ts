import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { SidebarService } from 'src/app/Services/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  patientId:any;

  constructor(public authService: AuthService,
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
