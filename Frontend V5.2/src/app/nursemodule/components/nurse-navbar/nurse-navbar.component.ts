
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Auth/auth.service';
import { SidebarService } from 'src/app/Services/sidebar.service';
import { ProBookDialogComponent } from '../../Dialog/booking-dialog/pro-book-dialog.component';

@Component({
  selector: 'app-nurse-navbar',
  templateUrl: './nurse-navbar.component.html',
  styleUrls: ['./nurse-navbar.component.css']
})
export class NurseNavbarComponent implements OnInit {

  constructor(public authService: AuthService,
    public sidebarservice: SidebarService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  status: boolean = true;
  clickEvent() {
    this.status = !this.status;
    this.sidebarservice.setSidebarStatus(this.status);

  }
  bookAppt() {

    this.dialog.open(ProBookDialogComponent, { width: '100%' }).afterClosed().subscribe(resp => console.log(resp));

  }

}
