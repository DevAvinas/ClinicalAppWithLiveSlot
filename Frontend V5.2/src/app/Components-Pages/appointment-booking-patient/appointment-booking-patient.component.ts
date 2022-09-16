import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Appointment } from 'src/app/Models/Appointment';
import { NodeWithI18n } from '@angular/compiler';
import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';
import { AppointmentService } from 'src/app/Services/appointment.service';

import { ProvideMasterService } from 'src/app/Services/provide-master.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-booking-patient',
  templateUrl: './appointment-booking-patient.component.html',
  styleUrls: ['./appointment-booking-patient.component.css']
})
export class AppointmentBookingPatientComponent implements OnInit {
  constructor(private router: Router,private formBuilder: FormBuilder, private apptserv: AppointmentService,
    private providerService: ProvideMasterService,
    private _snack:MatSnackBar) { }
  form!: FormGroup;
  submitted = false;
  now: any;
  newAppt: Appointment = new Appointment();
  phyArr:any=[];
  patSlots!: Appointment[];
  message!: string;
  disablebutton=false;


  timeSlots = [
    { key: "09:00:00-09:59:00", value: "9 A.M. - 10 A.M." },
    { key: "10:00:00-10:59:00", value: "10 A.M. - 11 A.M." },
    { key: "11:00:00-11:59:00", value: "11 A.M. - 12 P.M." },
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
    let fr_time: string = this.f['available_slot'].value.split("-")[0].substring(0, 5);
    console.log(fr_time);
    this.apptserv.checkPatientAppointmentClash(JSON.parse(sessionStorage.getItem('User') || '{}').patient_id, this.apptDate, fr_time)
    .subscribe((resp) => {
      this.patSlots = resp;
      console.log("Patient already has Appointments: " + this.patSlots);
      let clash: Boolean
      if (this.patSlots.length > 0) clash = true;

      //If no clash with patients other appointments
      if (!clash) {
    this.populateModel();
    console.log("In Appt Collection:"+ this.newAppt.apptFrTime);
    console.log(this.newAppt)
    this.apptserv.createAppt(this.newAppt).subscribe(resp=>{
      let createdAppt=resp;
      if(createdAppt.meetId===null) 
      // alert("Appointment Couldnt be Created!");
      this._snack.open(("Appointment Couldnt be Created!"),"Error",{
        duration: 3000
      });
      else {
        // alert("Appointment Created with Meeting ID: "+createdAppt.meetId);
        this._snack.open(("Appointment Created with Meeting ID: "+createdAppt.meetId),"Ok",{
          duration: 3000
        });
        this.router.navigate(['patient/patient-dashboard'])
    
      }
    })}
    else {
      this.message = "Patient has an ongoing Appointment on the same Date and Time!"
    }
  })
    

  }
  populateModel(){
    let time_array:string[]=this.f['available_slot'].value.split("-");
    this.newAppt.meetingTitle=this.f['Subject'].value;
    this.newAppt.description=this.f['description'].value;
    this.newAppt.apptType="CN",
    this.newAppt.patientId=JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    this.newAppt.phyId=this.phyId;
    
    this.newAppt.apptFrTime=time_array[0].substring(0,5);
    
    this.newAppt.apptToTime=time_array[1].substring(0,5);
    console.log(this.newAppt.apptFrTime);
    this.newAppt.apptDt=this.apptDate;
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
        Subject: new FormControl('', [Validators.required, Validators.minLength(6)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        phy_id: new FormControl('', [Validators.required]),
        dateofappointment: new FormControl('', [Validators.required]),
        available_slot: new FormControl('', [Validators.required]),
        startTime: new FormControl(''),
        endTime: new FormControl(''),
      }
        // ,{validators:[Validation.match('password','confirmpassword')]}
      )
  }
  createTimeSlots(startHour: number, endHour: number, interval: number) {
    
    var bookedSlots: any[] = [];
    this.timeSlots = [
      { key: "09:00:00-09:59:00", value: "9 A.M. - 10 A.M." },
      { key: "10:00:00-10:59:00", value: "10 A.M. - 11 A.M." },
      { key: "11:00:00-11:59:00", value: "11 A.M. - 12 P.M." },
      { key: "12:00:00-12:59:00", value: "12 P.M - 1 P.M." },
      { key: "14:00:00-14:59:00", value: "2 P.M. - 3 P.M." },
      { key: "15:00:00-15:59:00", value: "3 P.M. - 4 P.M." },
      { key: "16:00:00-16:59:00", value: "4 P.M. - 5 P.M." }
    ];
    this.phySlots.forEach(function (value) {
      console.log("Combining: "+ value.apptFrTime + "-" + value.apptToTime)
      bookedSlots.push(value.apptFrTime + "-" + value.apptToTime);
    });
  
    this.timeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));
    // console.log(JSON.stringify(this.newAppt))
    if(this.timeSlots.length==0){
      this.timeSlots.push({ key: "no slots avilable", value: "no slots avilable" })
      this.disablebutton=true;
    }else{
      this.disablebutton=false;
    }
    return this.timeSlots;
  }
  createTimeSlotsForToday(startHour: number, endHour: number, interval: number) {
    var n = new Date().toLocaleTimeString('en-GB');
    console.log(n.substring(0,2)+":00:00");
    var n1=n.substring(0,2)+":00:00";
    console.log(n1<'09:00:00')
    var bookedSlots: any[] = [];
    var pastSlots: any[] = [];
    this.timeSlots.forEach((function (e){
      if(n1>=e.key.substring(0,8)){
        pastSlots.push(e.key);
      }
      console.log(pastSlots);
  }))
  console.log(pastSlots);

    this.phySlots.forEach(function (value) {
      console.log("Combining: "+ value.apptFrTime + "-" + value.apptToTime)
      bookedSlots.push(value.apptFrTime + "-" + value.apptToTime);
    });
 
    this.timeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));
    this.timeSlots = this.timeSlots.filter(val => !pastSlots.includes(val.key));
    if(this.timeSlots.length==0){
      this.timeSlots.push({ key: "no slots avilable", value: "no slots avilable" })
      this.disablebutton=true;
    }
    // console.log(JSON.stringify(this.newAppt))
    return this.timeSlots;
  }
  ngOnInit(): void {
    
    var n = new Date().toLocaleTimeString('en-GB');
    //this.createTimeSlotsForToday(9,18,60);
    let d=new Date(new Date("2022-04-15").setHours(3, 2));
    console.log("time:"+ d);
    this.providerService.getAllPhysician
    ()
    .subscribe(data=>{
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
    this.message = undefined;

    console.log(physcian)
    this.phyId = physcian.provider_id;
    let patId = JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    this.newAppt.patientname=JSON.parse(sessionStorage.getItem('User') || '{}').firstname
                  +" "+JSON.parse(sessionStorage.getItem('User') || '{}').lastname
    console.log("Physcian Selected: " + patId);
    this.form.get('Subject')?.setValue("Appt of " + patId + "-" + this.phyId);
    this.newAppt.phyname=physcian.firstname+" "+physcian.lastname;
    if (!!this.apptDate) this.getSlots(this.phyId, this.apptDate);
  }

  dateSelected() {
    this.message = undefined;

    let dt = this.form.get('dateofappointment')?.value
    console.log("Date Selected: " + dt);
    this.apptDate = dt;
    if (!!this.phyId) this.getSlots(this.phyId, this.apptDate);
  }

  phySlots!: Appointment[];
  getSlots(phy_id: string, apptDate: string) {
    console.log("For slots: " + phy_id + "," + new Date(apptDate));
    this.apptserv.getSlotsOfPhy(phy_id, apptDate).subscribe(resp => {
      this.phySlots = resp;
      console.log(this.phySlots);
      const datePipe = new DatePipe('en-Us');
      datePipe.transform(new Date(), 'yyyy-MM-dd');
      datePipe.transform(apptDate, 'yyyy-MM-dd');
      if(datePipe.transform(new Date(), 'yyyy-MM-dd')==datePipe.transform(apptDate, 'yyyy-MM-dd'))
      {
        this.createTimeSlotsForToday(9, 18, 60);
      }
      else{
        this.createTimeSlots(9, 18, 60);

      }
    })
  }



}
