import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { ProviderRegistrationComponent } from '../provider-registration/provider-registration.component';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  patientId:any;

  constructor(public authService: AuthService,
    public sidebarservice:SidebarService,private dialog:MatDialog) {}

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
  }

  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }
  
  registerProviderDialog(){
    this.dialog.open(ProviderRegistrationComponent,{ width: '100%', panelClass:'custom-dialog-container'}).afterClosed().subscribe(resp=>console.log("Provider Registration: "+ resp));
  }
}
