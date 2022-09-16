import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDataCollectionAppointmentComponent } from '../edit-data-collection-appointment/edit-data-collection-appointment.component';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentEditHistoryService } from 'src/app/Services/appointment-edit-history.service';
import { AppointmentEditHistory } from 'src/app/Models/AppointmentEditHistory';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-scheduling-dashboard',
  templateUrl: './patient-scheduling-dashboard.component.html',
  styleUrls: ['./patient-scheduling-dashboard.component.css']
})
export class PatientSchedulingDashboardComponent implements OnInit {
  now:any;
  statusArray:any;
  addresscarrier:any;
  flag:any;

  timeSlots=  [
    {key:"9:00-10:00",value:"9 A.M. - 10 A.M."},
    {key:"10:00-11:00",value:"10 A.M. - 11 A.M."},
    {key:"11:00-12:00",value:"11 A.M. - 12 Noon"},
    {key:"12:00-13:00",value:"12 Noon - 1 P.M."},
    
    {key:"14:00-15:00",value:"2 P.M. - 3 P.M."},
    {key:"15:00-16:00",value:"3 P.M. - 4 P.M."},
    {key:"16:00-17:00",value:"4 P.M. - 5 P.M."}
   ];
  phyArr: any=[];
  historyArr: any;
  notificationCount: number;
  constructor(private apptHistory:AppointmentEditHistoryService,
    public modal: NgbModal,private apptserv: AppointmentService,
    private _snack:MatSnackBar) { }
  updateTime(value:any){
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(Date.now()+1), 'dd-mm-yyyy');
if(value=="1")
      console.log("Data will be ready for collection on" + this.now+ "date")
          this.statusArray="Patient Data Available for Collection";
   }


  ngOnInit(): void {
    this.createTimeSlots();
    this.setUsersList();
  }
  createTimeSlots() {
    // Subject: "John",

    // StartTime: new Date(2022,3,30,1,0,0),

    // EndTime: new Date(2022,3,30,3,0,0),

    // IsReadonly:true,
  var response =[  {
    Subject:"string",
    description :"string",
    phy_id :"string",
    patient_id:"string",
    dateofappointment:"2022-04-01",
    startTime:"9:00",
    endTime:"10:00",
   reason:"string"
    },{
    Subject:"string",
    description :"string",
    phy_id :"string",
    patient_id:"string",
    dateofappointment:"2022-04-01",
    startTime:"10:00",
    endTime:"11:00",
   reason:"string"
    }];

    var bookedSlots: any[]=[];
    response.forEach(function (value) {
      bookedSlots.push(value.startTime+"-"+value.endTime);
    }); 

    this.timeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));

    console.log(this.timeSlots);
    //return this.timeSlots;
}
editItem(value:any) {

  console.log(value)
  this.addresscarrier=value;
 // this.router.navigateByUrl(`EditUser/${userModel.id}`);

  const ref = this.modal.open(EditDataCollectionAppointmentComponent, { centered: true });
  ref.componentInstance.selectedUser = value;

  ref.result.then((Yes) => {
    console.log("Yes Click");

    this.setUsersList();
  },
    (cancel) => {
      console.log("Cancel Click");

    })
}

declineAppt(newAppt:Appointment){

  console.log("In Appt Collection:"+ newAppt.apptFrTime);
  console.log(newAppt)
  newAppt.reason="declined";
  newAppt.status="decline";

  this.apptserv.createAppt(newAppt).subscribe((resp: any)=>{
    let createdAppt=resp;
    if(createdAppt.meetId===null) alert("Appointment Couldnt be Created!");
    else {
    // alert("Appointment Declined with Meeting ID: "+createdAppt.meetId);
    this._snack.open(("Appointment Declined with Meeting ID: "+createdAppt.meetId),"Ok",{
      duration: 3000
    });
    this.setUsersList();
    }
  })
}

  setUsersList() {
    console.log("inside set user kist")
    this.phyArr=[];
    console.log(this.phyArr.length);

    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    var n = new Date().toLocaleTimeString('en-GB');
    console.log(n);
    console.log(n>"16:00:00");
    // var array = ['a','b','c','d','e','f'];
    // console.log(array.toString()); 
    this.apptserv.getppointmentByStatus
    (JSON.parse(sessionStorage.getItem('User') || '{}').patient_id,['reschedule','confirm','request'])
    // if((this.now<element.apptDt)){
    //   this.phyArr.push(element);
    // }
    // if((this.now==element.apptDt)&&(element.apptFrTime>n)){
    //   this.phyArr.push(element);

    // }
    //('PT005','reschedule')
    .subscribe((data: any)=>{
      console.log(data)
      data.forEach((element: Appointment) => {

        if(element.apptType=='DC'){
          //element.apptDt=datePipe.transform(element.apptDt, 'dd/MM/yyyy');
   if((this.now<datePipe.transform(element.apptDt, 'yyyy-MM-dd'))){
      this.phyArr.push(element);
    }
    if((this.now==datePipe.transform(element.apptDt, 'yyyy-MM-dd'))&&(element.apptFrTime>n)){
      this.phyArr.push(element);

    }
          // this.phyArr.push(element);

        }
      });
      
      // this.phyArr=data;
      console.log(this.phyArr)
    })

  }

}
