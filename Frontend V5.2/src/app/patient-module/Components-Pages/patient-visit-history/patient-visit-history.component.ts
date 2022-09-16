import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { AppointmentService } from 'src/app/Services/appointment.service';
import { AppointmentEditHistoryService } from 'src/app/Services/appointment-edit-history.service';

@Component({
  selector: 'app-patient-visit-history',
  templateUrl: './patient-visit-history.component.html',
  styleUrls: ['./patient-visit-history.component.css']
})
export class PatientVisitHistoryComponent implements OnInit {
  phyArr: any[];
  phyArrdc: any[];

  display = "none";
  historyArr: any;
  now: string;
  constructor(private apptHistory:AppointmentEditHistoryService,private apptserv: AppointmentService) { }

  ngOnInit(): void {
      this.getVisitHistoryCN();
      this.getVisitHistoryDC();

  }
  openModal(value:any) {
    console.log(value);
    this.display = "block";
    this.fetchHistory(value);
  }
  onCloseHandled() {
    this.display = "none";
  }
  fetchHistory(id:string){
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.apptHistory.getHistory(id)
        .subscribe(data=>{
          data.forEach((n: any) => {
            n.apptDt=datePipe.transform(n.apptDt, 'yyyy-MM-dd');
            n.modifiedTs=datePipe.transform(n.modifiedTs, 'dd/MM/yyyy hh:mm a');
          });
          this.historyArr=data;
          console.log(this.historyArr)
  
        })
        const str = '2017-02-17T22:32:25.000Z';
  const d = new Date(str);
  console.log(d)
  }
  
  getVisitHistoryCN(){
  
    console.log("inside set user kist")
     this.phyArr=[];
    this.apptserv.getPhysicianByStatus
    (JSON.parse(sessionStorage.getItem('User') || '{}').patient_id,'complete')

    //('PT005','Req')
    .subscribe((data: any)=>{
      console.log(data)
        data.forEach((element: any) => {
          if (element.apptType=='CN') {
            this.phyArr.push(element);

          }
        });
         //this.phyArr.push(data);

      console.log(this.phyArr)
    })
    
}
getVisitHistoryDC(){
  
  console.log("inside set user kist")
   this.phyArr=[];
  this.apptserv.getPhysicianByStatus
  (JSON.parse(sessionStorage.getItem('User') || '{}').patient_id,'complete')

  //('PT005','Req')
  .subscribe((data: any)=>{
    console.log(data)
      data.forEach((element: any) => {
        if (element.apptType=='DC') {
          this.phyArrdc.push(element);

        }
      });
       //this.phyArr.push(data);

    console.log(this.phyArr)
  })
  
}
}
