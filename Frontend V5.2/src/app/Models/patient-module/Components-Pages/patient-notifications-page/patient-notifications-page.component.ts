import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppointmentEditHistory } from 'src/app/Models/AppointmentEditHistory';
import { AppointmentEditHistoryService } from 'src/app/Services/appointment-edit-history.service';
import * as lodash from 'lodash';

@Component({
  selector: 'app-patient-notifications-page',
  templateUrl: './patient-notifications-page.component.html',
  styleUrls: ['./patient-notifications-page.component.css']
})
export class PatientNotificationsPageComponent implements OnInit {
  now: string;
  notificationCount: any;
  historyArr: any=[];

  constructor(private apptHistory:AppointmentEditHistoryService) { }

  ngOnInit(): void {
      this.fetchHistory();
  }//reschedule:no time
  fetchHistory(){
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.apptHistory.getHistoryByPatientId(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id)
        .subscribe(data=>{
          console.log(data);
          data.forEach((n: AppointmentEditHistory) => {
                if (datePipe.transform(n.apptDt, 'yyyy-MM-dd')>=this.now
                        && (n.reason.includes('reschedule')||n.status=='decline')) {
                          n.apptDt=datePipe.transform(n.apptDt, 'yyyy-MM-dd');
                          n.modifiedTs=datePipe.transform(n.modifiedTs, 'dd/MM/yyyy hh:mm a');

                            this.historyArr.push(n);

                }
          });

              this.historyArr.reverse();
              console.log(this.historyArr);
        })


    
  }

}
