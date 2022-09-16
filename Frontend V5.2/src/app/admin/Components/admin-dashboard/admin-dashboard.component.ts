import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { ProviderMaster } from '../../Model/ProviderMaster';
import { AdminService } from '../../Service/admin.service';
import { ProviderRegistrationComponent } from '../provider-registration/provider-registration.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  phyCount = 0;
  patCount = 0;
  nurseCount = 0;
  apptCount = 0;
  userEmail: string;
  user: ProviderMaster;
  username: any;

  constructor(private dialog:MatDialog,private serv: AdminService, private dashboardService: DashboardService) {
  }
  
  registerProviderDialog(){
    this.dialog.open(ProviderRegistrationComponent,{ width: '100%', panelClass:'custom-dialog-container'}).afterClosed().subscribe(resp=>console.log("Provider Registration: "+ resp));
  }

  ngOnInit(): void {
    // this.dashboardService.email_ob.subscribe((email: string) => this.userEmail = email);
    // this.dashboardService.getProvider(this.userEmail).subscribe((data: ProviderMaster) => {
    //   this.user = data;
    //   console.log("--------------------------User data---------------------------")
    //   console.log(this.user);
    //   sessionStorage.setItem('User', JSON.stringify(this.user));
    //   console.log(sessionStorage.getItem('User'));
      
    // });
    this.serv.countOfAppts().subscribe(resp => this.apptCount = resp);
    this.serv.countOfPatients().subscribe(resp => this.patCount = resp);
    this.serv.countOfDoctors().subscribe(resp => this.phyCount = resp);
    this.serv.countOfNurse().subscribe(resp => this.nurseCount = resp);
  }
}

