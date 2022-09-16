import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
 import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Appointment } from 'src/app/Models/Appointment';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-edit-data-collection-appointment',
  templateUrl: './edit-data-collection-appointment.component.html',
  styleUrls: ['./edit-data-collection-appointment.component.css']
})
export class EditDataCollectionAppointmentComponent implements OnInit  {
selectedUser:any;
  constructor(private _snack:MatSnackBar,public modal: NgbActiveModal,private formBuilder: FormBuilder, private apptserv: AppointmentService) {
   }
  form!: FormGroup;
  submitted = false;
  now: any;
  newAppt: Appointment = new Appointment();
  phyArr:any=[];


  timeSlots = [
    { key: "09:00:00-09:59:00", value: "9 A.M. - 10 A.M." },
    { key: "10:00:00-11:59:00", value: "10 A.M. - 11 A.M." },
    { key: "11:00:00-12:59:00", value: "11 A.M. - 12 P.M." },
    { key: "12:00:00-12:59:00", value: "12 P.M - 1 P.M." },
    { key: "14:00:00-14:59:00", value: "2 P.M. - 3 P.M." },
    { key: "15:00:00-15:59:00", value: "3 P.M. - 4 P.M." },
    { key: "16:00:00-16:59:00", value: "4 P.M. - 5 P.M." }
  ];

  objectKeys = Object.keys;

  //not used
  updateTime(value: Event) {
    console.log("as: "+this.f['available_slot'].value.split("-"));
  }

  ///Saving the form
  createAppt() {
    this.submitted = true;
    this.populateModel();
    console.log("In Appt Collection:"+ this.newAppt.apptFrTime);
    console.log(this.newAppt)
    this.apptserv.createAppt(this.newAppt).subscribe((resp: any)=>{
      let createdAppt=resp;
      if(createdAppt.meetId===null) alert("Appointment Couldnt be Created!");
      else {
      // alert("Appointment Created with Meeting ID: "+createdAppt.meetId);
      this._snack.open(("Appointment Created with Meeting ID: "+createdAppt.meetId),"Ok",{
        duration: 3000
      });
      this.modal.close('Yes');
      }
    })
  

  }


  populateModel(){
    let time_array:string[]=this.f['available_slot'].value.split("-");
    this.newAppt.meetingTitle=this.f['Subject'].value;
    this.newAppt.description=this.f['description'].value;
    this.newAppt.apptType="DC",
    this.newAppt.patientId=JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    // this.newAppt.phyId=this.phyId;
    this.newAppt.changedbyId=JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    this.newAppt.apptFrTime=time_array[0].substring(0,5);
    this.newAppt.reason="reschedule"
    this.newAppt.apptToTime=time_array[1].substring(0,5);
    console.log(this.newAppt.apptFrTime);
    this.newAppt.apptDt=this.f['dateofappointment'].value;
    this.newAppt.status="request";
  }

  //getter to call the controls of your form
  get f() {
    return this.form.controls;
  }
  //   "Subject":"string",
  //   "description" :"string",
  //   "phy_id" :"string",
  //   "patient_id":"string",
  //   "dateofappointment":"string",
  //   "startTime":"string",
  //   "endTime":"string",
  // "reason":"string"
  formData() {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.form = this.formBuilder.group
      //this.form = new FormGroup
      ({
        // userid: new FormControl(1,[Validators.required, Validators.minLength(6)]),
        Subject: new FormControl(this.newAppt.meetingTitle, [Validators.required, Validators.minLength(6)]),
        description: new FormControl(this.newAppt.description, [Validators.required, Validators.minLength(10)]),
        phy_id: new FormControl(this.newAppt.phyname, [Validators.required]),
        dateofappointment: new FormControl(this.newAppt.apptDt, [Validators.required]),
        available_slot: new FormControl(this.newAppt.apptFrTime+"-"+this.newAppt.apptToTime, [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
      }
        // ,{validators:[Validation.match('password','confirmpassword')]}
      )
  }
  createTimeSlots(startHour: number, endHour: number, interval: number) {
    // Subject: "John",

    // StartTime: new Date(2022,3,30,1,0,0),

    // EndTime: new Date(2022,3,30,3,0,0),

    // IsReadonly:true,
    // var response = [{
    //   Subject: "string",
    //   description: "string",
    //   phy_id: "string",
    //   patient_id: "string",
    //   dateofappointment: "2022-04-01",
    //   startTime: "9:00",
    //   endTime: "10:00",
    //   reason: "string"
    // }, {
    //   Subject: "string",
    //   description: "string",
    //   phy_id: "string",
    //   patient_id: "string",
    //   dateofappointment: "2022-04-01",
    //   startTime: "10:00",
    //   endTime: "11:00",
    //   reason: "string"
    // }];

    var bookedSlots: any[] = [];
    this.phySlots.forEach(function (value) {
      console.log("Combining: "+ value.apptFrTime + "-" + value.apptToTime)
      bookedSlots.push(value.apptFrTime + "-" + value.apptToTime);
    });
    // console.log(bookedSlots);
    // if (!startHour) {
    //     endHour = 8;
    // }
    // if (!endHour) {
    //     endHour = 20;
    // }

    //     var dateTime = new Date();
    //     var timeStr = "";
    // dateTime.setHours(startHour, 0, 0, 0);
    // while (new Date(dateTime.getTime() + interval * 60000).getHours() < endHour) {
    //     timeStr = dateTime.getHours() + ':' +"00";
    //     timeStr += '-';
    //     dateTime = new Date(dateTime.getTime() + interval * 60000);
    //     timeStr += dateTime.getHours() +":00";
    //     this.timeSlots.;
    //     JSON.stringify(this.user)
    // }`
    this.timeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));
    // console.log(JSON.stringify(this.newAppt))
    return this.timeSlots;
  }
  ngOnInit(): void {
   
    this.formData();

    this.newAppt=this.selectedUser;
    this.formData();

    console.log(this.selectedUser)
    // this.form.patchValue({
    //     description:'hi'
    //   });
    // this.form.get('Subject')?.setValue(this.selectedUser.meetingTitle);
    // this.form.get('description')?.setValue(this.newAppt.description);
    // // this.form.get('phy_id')?.setValue(this.newAppt.phyId);
    // this.form.get('dateofappointment')?.setValue(this.newAppt.apptDt);
    // this.form.get('available_slot')?.setValue(this.newAppt.apptFrTime+"-"+this.newAppt.apptToTime);

    let d=new Date(new Date("2022-04-15").setHours(3, 2));
    console.log("time:"+ d);
    
    this.apptserv.getPhysicianByStatus
    (JSON.parse(sessionStorage.getItem('User') || '{}').patient_id,'Req')

    //('PT005','Req')
    .subscribe((data: any)=>{
      console.log(data)
      this.phyArr=data;
      console.log(this.phyArr)
    })
    this.formData();

  }

  ///Raghu Code

  // phyArr = [{
  //   id: "CT001",
  //   name: "S Khan",
  // }, {
  //   id: "CT002",
  //   name: "V.S. Subramanium",
  // },
  // {
  //   id: "CT003",
  //   name: "Ashoknath Vijay",
  // },
  // {
  //   id: "CT004",
  //   name: "P.S. MURMU",
  // },
  // {
  //   id: "CT005",
  //   name: "Francis Xavier",
  // }]

  phyId!: string;
  apptDate!: string;

  phySelected(physcian: any) {
    console.log(physcian)
    this.phyId = physcian.phyId;
    let patId = JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    this.newAppt.patientname=JSON.parse(sessionStorage.getItem('User') || '{}').firstname
                  +" "+JSON.parse(sessionStorage.getItem('User') || '{}').lastname
    console.log("Physcian Selected: " + patId);
    this.form.get('Subject')?.setValue("Appt of " + patId + "-" + this.phyId);
    this.form.get('description')?.setValue("Data Collection appointment for Meeting Id - " + physcian.meetId);
    this.newAppt.phyname=physcian.phyname;
    if (!!this.apptDate) this.getSlots(this.phyId, this.apptDate);
  }

  dateSelected() {
    let dt = this.form.get('dateofappointment')?.value
    console.log("Date Selected: " + dt);
    this.apptDate = dt;
    if (!!this.phyId) this.getSlots(this.phyId, this.apptDate);
  }

  phySlots!: Appointment[];
  getSlots(phy_id: string, apptDate: string) {
    console.log("For slots: " + phy_id + "," + new Date(apptDate));
    this.apptserv.getSlotsOfPhy(phy_id, apptDate).subscribe((resp: Appointment[]) => {
      this.phySlots = resp;
      console.log(this.phySlots);
      this.createTimeSlots(9, 18, 60);
    })
  }
}
