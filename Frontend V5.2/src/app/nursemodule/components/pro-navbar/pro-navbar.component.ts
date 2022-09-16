import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/auth.service';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { ProBookDialogComponent } from '../../Dialog/booking-dialog/pro-book-dialog.component';

@Component({
  selector: 'pro-navbar',
  templateUrl: './pro-navbar.component.html',
  styleUrls: ['./pro-navbar.component.css']
})
export class ProNavbarComponent implements OnInit {

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
  bookAppt(){

    this.dialog.open(ProBookDialogComponent, { width: '100%'}).afterClosed().subscribe(resp => console.log(resp));

 }
}
