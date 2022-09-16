import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderMaster } from 'src/app/admin/Model/ProviderMaster';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-nurse-dashboard',
  templateUrl: './nurse-dashboard.component.html',
  styleUrls: ['./nurse-dashboard.component.css']
})
export class NurseDashboardComponent implements OnInit {
  userEmail: string;
  user: ProviderMaster;
  username: string;

  constructor(private dashboardService: DashboardService, private router: Router) {

  }


  ngOnInit(): void {
    this.dashboardService.email_ob.subscribe((email: string) => this.userEmail = email);
    this.dashboardService.getProvider(this.userEmail).subscribe((data: ProviderMaster) => {
      this.user = data;
    console.log("--------------------------User data---------------------------")
    console.log(this.user);
  //  this.username = this.user.firstname + " " + this.user.lastname;
    //setting object to session
    sessionStorage.setItem('User', JSON.stringify(this.user));
    console.log(sessionStorage.getItem('User'));
    // this.dashboardService.checkPatientDetails(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id).subscribe(data=>{
    //   console.log("Old User ?"+data);
  
    // })
   console.log(this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id);
  
    // console.log(JSON.parse(sessionStorage.getItem('User') || '{}')['firstname']);
    // let id = JSON.parse(sessionStorage.getItem('User') || '{}');
    // console.log(sessionStorage.getItem('User'));


    });  

  }
  // openNav() {
  //   document.getElementById("mySidenav").style.width = "250px";
  // }
  // closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  // }

}
