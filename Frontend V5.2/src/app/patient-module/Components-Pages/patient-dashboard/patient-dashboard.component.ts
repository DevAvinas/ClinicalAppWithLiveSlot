import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentEditHistory } from 'src/app/Models/AppointmentEditHistory';
import { AppointmentEditHistoryService } from 'src/app/Services/appointment-edit-history.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css']
})
export class PatientDashboardComponent implements OnInit {
  active = 1;
  now: string;
  notificationCount: number=0;
  historyArr: any;

  constructor(private apptHistory:AppointmentEditHistoryService) { }

  ngOnInit(): void {
      this.fetchHistory();
  }
  fetchHistory(){
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.apptHistory.getHistoryByPatientId(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id)
        .subscribe(data=>{
          console.log(data);
          data.forEach((n: AppointmentEditHistory) => {
                if (datePipe.transform(n.apptDt, 'yyyy-MM-dd')>=this.now
                        && (n.reason.includes('reschedule')||n.status=='decline')) {
                            this.notificationCount =this.notificationCount+1;
                            console.log(this.notificationCount)

                }
          });
          //this.historyArr=data;
          console.log(this.notificationCount)
  
        })

  }
}
