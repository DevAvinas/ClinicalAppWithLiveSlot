import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { View, EventSettingsModel, AgendaService, MonthService, DayService, WeekService, TimeScaleModel, EventRenderedArgs, PopupOpenEventArgs, ScheduleComponent } from '@syncfusion/ej2-angular-schedule'
import { ProBookDialogComponent } from '../../Dialog/booking-dialog/pro-book-dialog.component';
import { ApptSync } from '../../models/ApptSync';
import { MedicationDetailsService } from '../../services/medication-details.service';







@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  providers: [DayService, WeekService, MonthService, AgendaService],
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  apptArr: ApptSync[] = new Array();
  appt: ApptSync = new ApptSync();
  username: any;

  

  constructor( private dialog: MatDialog,private medservice:MedicationDetailsService,private _snack:MatSnackBar) { }



  ngOnInit(): void {
   
    {
      const todayDate = new Date();
      this.username=JSON.parse(sessionStorage.getItem('User') || '{}').provider_id;
      ///Call the Appointment
      this.medservice.getUpcomingAppointmentnew(this.username).subscribe(data => {

        for (var a of data) {
          let appt: ApptSync = new ApptSync();
          appt.Subject = a.patientname;
          appt.Location=a.meetingTitle;
          appt.Description = a.description;

          //setting startDate
          let doa: any = a.apptDt;
          let st: any = doa + "T" + a.apptFrTime;
          let et: any = doa + "T" + a.apptToTime;
          appt.StartTime = new Date(st);
          appt.EndTime = new Date(et);

          appt.IsBlock=false;
          appt.IsReadonly = true;
          console.log("Appt Subject: " + appt.Subject);
          console.log("Appt FrTime: " + appt.StartTime);
          console.log("Appt ToTime: " + appt.EndTime);

          //Colour Coding
          let otherDate = new Date(st);
          if (
            otherDate.getDate() === todayDate.getDate() &&
            otherDate.getMonth() === todayDate.getMonth() &&
            otherDate.getFullYear() === todayDate.getFullYear()
          ) {
            //Upcoming Appointments of Today
            console.log("Its Today date:" + otherDate);
            appt.CategoryColor = "#EDDA74";
          }
          ///Next Day Appointments
          else appt.CategoryColor = "#B4CFEC";


          if (
            
            otherDate.getDate() === todayDate.getDate() &&
            otherDate.getMonth() === todayDate.getMonth() &&
            otherDate.getFullYear() === todayDate.getFullYear() &&
            otherDate.getHours() < todayDate.getHours()
          ) { ///Todays Old Appointments
            appt.CategoryColor = "#C0C0C0";
          }


          if (
            otherDate.getDate() === todayDate.getDate() &&
            otherDate.getMonth() === todayDate.getMonth() &&
            otherDate.getFullYear() === todayDate.getFullYear() &&
            otherDate.getHours() === todayDate.getHours()
          ) {
            ///Current Appointment
            console.log("Appt hour: " + otherDate.getHours());
            console.log("now hour: " + todayDate.getHours());
            appt.CategoryColor = "#77DD77";
          }
          console.log("Populated Model: "+ Object.keys(appt)+"---- Values: "+ Object.values(appt));
          this.apptArr.push(appt);
        }
        console.log("Data received: " + this.apptArr);

        let lunch: ApptSync = new ApptSync();
        lunch.Subject = "Lunch";
        lunch.StartTime = new Date(2022, 3, 10, 14, 0, 0);
        lunch.EndTime = new Date(2022, 3, 10, 15, 0, 0);
        lunch.IsBlock = true;
        // lunch.CategoryColor = "#eaf2d7";
        lunch.RecurrenceRule = "FREQ=DAILY";
        this.apptArr.push(lunch);

      });


    }
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    
    let subExists =  JSON.stringify(args.data).includes("Subject");   
    if (args.type === 'Editor' || !subExists) {
      let strttime= new Date(JSON.parse(JSON.stringify(args.data)).startTime);
      console.log("Popy starttime: "+ strttime );
      let todayDt= new Date();
      args.cancel = true;
      console.log("Start time"+strttime);
      console.log("today's date time"+todayDt.getDate());
      
      if(strttime.getTime()<=todayDt.getTime()) 
      {
        this._snack.open("Please Select an Upcoming Appointment ","Ok",{
          duration: 3000
        });
      }
    
      
      else {
      console.log("Popup: " + args.type);
      this.dialog.open(ProBookDialogComponent, { width: '100%'}).afterClosed().subscribe(resp => console.log("bookappt"+resp));
      }
    }
    

  }




  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public today = new Date();
  public minDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  public selectedDate: Date = new Date();
  public setView: View = 'Agenda';
  public eventSettings: EventSettingsModel = {
    dataSource: this.apptArr,
    
    // [{
    //   Subject: "John",
    //   StartTime: new Date(2022,3,30,1,0,0),
    //   EndTime: new Date(2022,3,30,3,0,0),
    //   IsReadonly:true,
    //   IsBlock:true
    //   RecurrenceRule:"FREQ=DAILY;INTERVAL=1;COUNT=10"
    //   IsAllDay: true
    // }],
    // fields: {
    //   subject: {name:'PatientName'},
    //   startTime: {name: 'From'},
    //   endTime: {name:'To'}
    // }


  }


  public onEventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data['CategoryColor'] as string;
    console.log("console: " + this.scheduleObj.currentView);
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;

    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  


}
