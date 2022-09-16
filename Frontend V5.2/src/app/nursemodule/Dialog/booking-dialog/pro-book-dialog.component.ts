import { Component, Inject, OnInit, Provider } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { Appointment } from '../../models/Appointment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { PatientMaster } from '../../models/PatientMaster';
import { ProviderMaster } from '../../models/ProviderMaster';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-pro-book-dialog',
  templateUrl: './pro-book-dialog.component.html',
  styleUrls: ['./pro-book-dialog.component.css']
})
export class ProBookDialogComponent implements OnInit {
  username: any;
  constructor(private _snack:MatSnackBar,private formBuilder: FormBuilder, private apptserv: AppointmentService, @Inject(MAT_DIALOG_DATA) public meetingData: Appointment, private dialogRef: MatDialogRef<ProBookDialogComponent>) { }

  form!: FormGroup;
  submitted = false;
  meetingDataLock = false;
  now: any;
  newAppt: Appointment = new Appointment();
  phy!: ProviderMaster;
  pat!: PatientMaster;
  apptDate!: string;
  phySlots!: Appointment[];
  patSlots!: Appointment[];
  patArr: PatientMaster[] = [];
  phyArr: ProviderMaster[] = [];
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

  filteredTimeSlots: { key: string; value: string; }[];

  objectKeys = Object.keys;

  ngOnInit(): void {
    this.formData();
    if (this.meetingData) {
      //Call this.phySelected after getting phy object
      //Cal this.patientSelected after getting pat object
    
      this.meetingDataLock=true;
      this.form.get('Subject')?.setValue(this.meetingData.meetingTitle);
      this.form.get('description')?.setValue(this.meetingData.description);
      this.form.get('phy_id')?.setValue(this.meetingData.phyname);
      this.form.get('pat_id')?.setValue(this.meetingData.patientname);
      this.form.get('dateofappointment')?.setValue(this.meetingData.apptDt);
      // this.form.get('available_slot')?.setValue(this.meetingData.apptFrTime);
      this.apptserv.getbypatientid(this.meetingData.patientId).subscribe(resp=>this.patSelected(resp))
      this.apptserv.getbyproviderid(this.meetingData.phyId).subscribe(resp=>{
        this.phySelected(resp);
        this.dateSelected();
      });
    }
    else {
     
      this.apptserv.getAllPatients().subscribe((data: any) => { this.patArr = data })
      this.apptserv.getAllPhysician().subscribe((data: any) => {
        this.phyArr = data;
       // this.form.get('phy_id')?.setValue("Alpha");
        let tempid = JSON.parse(sessionStorage.getItem('User') || '{}').provider_id ///Get this from Session Storage
         ///Get this from Session Storage
        let tempPhys:ProviderMaster[] = this.phyArr.filter(i => i.provider_id == tempid);
        this.form.get('phy_id')?.setValue(tempPhys[0].firstname);
        this.phySelected(tempPhys[0]);
      })
    }

    

  }



  ///Saving the form
  createAppt() {
    this.submitted = true;
    let fr_time: string = this.f['available_slot'].value.split("-")[0].substring(0, 5);

    this.apptserv.checkPatientAppointmentClash(this.pat.patient_id, this.apptDate, fr_time).subscribe(resp => {
      this.patSlots = resp;
      console.log("Patient already has Appointments: " + this.patSlots);
      let clash: Boolean
      if (this.patSlots.length > 0) clash = true;

      //If no clash with patients other appointments
      if (!clash) {
        this.populateModel();
        this.apptserv.createAppt(this.newAppt).subscribe(resp => {
          let createdAppt = resp;
          if (createdAppt.meetId === null){
          // alert("Appointment Couldnt be Created!");
          this._snack.open("Appointment Couldnt be Created!" ,"Ok")
          duration: 3000
          }
          else 
          //alert("Appointment Created with Meeting ID: " + createdAppt.meetId);
          this._snack.open("Appointment Created with Meeting ID: " + createdAppt.meetId ,"Ok")
          duration: 3000
          this.dialogRef.close();
        })
      }
      else {
        this.message = "Patient has an ongoing Appointment on the same Date and Time!"
      }
    })
    
  }


  updateAppt() {
    this.submitted = true;
    let fr_time: string = this.f['available_slot'].value.split("-")[0].substring(0, 5);

    this.apptserv.checkPatientAppointmentClash(this.pat.patient_id, this.apptDate, fr_time).subscribe(resp => {
      this.patSlots = resp;
      console.log("Patient already has Appointments: " + this.patSlots);
      let clash: Boolean
      if (this.patSlots.length > 0) clash = true;

      //If no clash with patients other appointments
      if (!clash) {
        this.populateMeetingDataModel();
        this.apptserv.updateAppt(this.meetingData.meetId, this.newAppt).subscribe(resp => {
          let createdAppt = resp;
          if (createdAppt.meetId === null){//alert("Appointment Couldnt be Created!");
          this._snack.open("Appointment Couldnt be Created!","Ok")
          duration: 3000
          }
          else 
          //alert("Appointment " + createdAppt.meetId + " Successfully Updated");
          this._snack.open("Appointment " + createdAppt.meetId + " Successfully Updated","Ok")
          duration: 3000
          this.dialogRef.close();
        })
      }
      else {
        this.message = "Patient has an ongoing Appointment on the same Date and Time!"
      }
    })
  }





  populateModel() {
    let time_array: string[] = this.f['available_slot'].value.split("-");
    this.newAppt.meetingTitle = this.f['Subject'].value;
    this.newAppt.description = this.f['description'].value;
    this.newAppt.apptType = "CN",
      this.newAppt.patientId = this.pat.patient_id;
    this.newAppt.phyId = this.phy.provider_id;
    this.newAppt.apptFrTime = time_array[0].substring(0, 5);
    this.newAppt.apptToTime = time_array[1].substring(0, 5);
    this.newAppt.apptDt = this.apptDate;
    this.newAppt.status = "confirm";
    this.newAppt.patientname = this.pat.firstname + " " + this.pat.lastname;
    this.newAppt.phyname = this.phy.firstname + " " + this.phy.lastname;
  }

  populateMeetingDataModel() {
    let time_array: string[] = this.f['available_slot'].value.split("-");
    this.newAppt.meetingTitle = this.f['Subject'].value;
    this.newAppt.description = this.f['description'].value;
    this.newAppt.apptType = "CN",
      this.newAppt.patientId = this.meetingData.patientId;
    this.newAppt.phyId = this.meetingData.phyId;
    this.newAppt.apptFrTime = time_array[0].substring(0, 5);
    this.newAppt.apptToTime = time_array[1].substring(0, 5);
    this.newAppt.apptDt = this.apptDate;
    this.newAppt.status = "confirm";
    this.newAppt.patientname = this.meetingData.patientname;
    this.newAppt.phyname = this.meetingData.phyname;
    this.newAppt.changedbyId=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id ;  
    this.newAppt.reason = "reschedule: "+this.f['reason'].value;
  }

  //getter to call the controls of your form
  get f() {
    return this.form.controls;
  }

  formData() {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.form = this.formBuilder.group
      //this.form = new FormGroup
      ({
        Subject: new FormControl('', [Validators.required, Validators.minLength(6)]),
        description: new FormControl('', [Validators.required, Validators.minLength(10)]),
        phy_id: new FormControl('', [Validators.required]),
        pat_id: new FormControl('', [Validators.required]),
        dateofappointment: new FormControl('', [Validators.required]),
        available_slot: new FormControl('', [Validators.required]),
        startTime: new FormControl('', [Validators.required]),
        endTime: new FormControl('', [Validators.required]),
        reason: new FormControl('')
      }
      )
  }

  createTimeSlots(startHour: number, endHour: number, interval: number) {
    var bookedSlots: any[] = [];
    this.phySlots.forEach(function (value) {
      console.log("Combining: " + value.apptFrTime + "-" + value.apptToTime)
      bookedSlots.push(value.apptFrTime + "-" + value.apptToTime);
    });
    console.log("Time Slots Filtering: " + this.timeSlots);
    this.filteredTimeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));
    if(this.timeSlots.length==0){
      this.filteredTimeSlots.push({ key: "no slots avilable", value: "no slots avilable" })
      this.disablebutton=true;
    }else{
      this.disablebutton=false;
    }
    // console.log(JSON.stringify(this.newAppt))
    // return this.timeSlots;
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
 
    this.filteredTimeSlots = this.timeSlots.filter(val => !bookedSlots.includes(val.key));
    this.filteredTimeSlots = this.timeSlots.filter(val => !pastSlots.includes(val.key));
    if(this.filteredTimeSlots.length==0){
      this.filteredTimeSlots.push({ key: "no slots avilable", value: "no slots avilable" })
      this.disablebutton=true;
    }
    // console.log(JSON.stringify(this.newAppt))
    return this.filteredTimeSlots;
  }


  getSlots(phy_id: string, apptDate: string) {
    console.log("For slots: " + phy_id + "," + new Date(apptDate));
    this.apptserv.getSlotsOfPhy(phy_id, apptDate).subscribe(resp => {
      this.phySlots = resp;
      console.log("Physicians Slots: " + this.phySlots);
      //here 
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

  phySelected(physcian: ProviderMaster) {
    this.message = undefined;
    this.phy = physcian;
    console.log("Provider ID Selected:" + this.phy.provider_id);
    if (!!this.pat) this.form.get('Subject')?.setValue("Appt of " + this.pat.patient_id + "-" + this.phy.provider_id);
    if (!!this.apptDate) this.getSlots(this.phy.provider_id, this.apptDate);
  }

  patSelected(patient: PatientMaster) {
    this.message = undefined;
    this.pat = patient;
    console.log("Patientr ID Selected:" + this.pat.patient_id);
    if (!!this.phy) this.form.get('Subject')?.setValue("Appt of " + this.pat.patient_id + "-" + this.phy.provider_id);
  }

  dateSelected() {
    this.message = undefined;
    let dt = this.form.get('dateofappointment')?.value
    console.log("Date Selected: " + dt);
    this.apptDate = dt;
    if (!!this.phy.provider_id) this.getSlots(this.phy.provider_id, this.apptDate);
  }


}
