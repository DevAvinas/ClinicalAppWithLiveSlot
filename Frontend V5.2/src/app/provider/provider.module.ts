import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbouthospitalComponent } from './components/abouthospital/abouthospital.component';

import { MedicationDetailsComponent } from './components/medication-details/medication-details.component';
import { OldappointmentsComponent } from './components/oldappointments/oldappointments.component';

import { ProcedureMasterComponent } from './components/Procedure-master/procedure-master.component';
import { ProviderAppointmentPagesComponent } from './components/provider-appointment-pages/provider-appointment-pages.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { ProviderOldAppointmentsComponent } from './components/provider-old-appointments/provider-old-appointments.component';
import { ProviderOldVitaltableComponent } from './components/provider-old-vitaltable/provider-old-vitaltable.component';
import { RequestedAppointmentsComponent } from './components/requested-appointments/requested-appointments.component';
import { VitalmodalComponent } from './components/vitalmodal/vitalmodal.component';
import { ProviderRoutingModule } from './provider-routing.module';
// import { PatientDetailsComponent } from '../Components-Pages/patient-details/patient-details.component';
// import { PatientEmergencyDetailsComponent } from '../Components-Pages/patient-emergency-details/patient-emergency-details.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NurseDashboardComponent } from './components/nurse-dashboard/nurse-dashboard.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { DiagnosisMasterComponent } from './components/diagnosis-master/diagnosis-master.component';
import { UpcomingconfirmedappointmentsComponent } from './components/upcomingconfirmedappointments/upcomingconfirmedappointments.component';
import { ProBookDialogComponent } from './Dialog/booking-dialog/pro-book-dialog.component';
//import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotificationproviderComponent } from './components/notificationprovider/notificationprovider.component';
//import { VitalEditpatientDemoDetailsComponent } from './components/vital-editpatient-demo-details/vital-editpatient-demo-details.component';
import { VitalsEditPatientEmergencyDetailsComponent } from './components/vitals-edit-patient-emergency-details/vitals-edit-patient-emergency-details.component';
import { ProvideredithistoryComponent } from './components/provideredithistory/provideredithistory.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    // PatientDetailsComponent,
    // PatientEmergencyDetailsComponent,
    AbouthospitalComponent,
 
   // MedicationDetailsComponent,
    OldappointmentsComponent,
    PatientVisitDetailsComponent,
    ProcedureMasterComponent,
   // ProviderAppointmentPagesComponent,
    ProviderDashboardComponent,
    ProviderOldAppointmentsComponent,
    ProviderOldVitaltableComponent,
    RequestedAppointmentsComponent,
    //VitalmodalComponent,
    NurseDashboardComponent,
    DiagnosisMasterComponent,
    UpcomingconfirmedappointmentsComponent,
    ProBookDialogComponent,
    CalendarComponent,
    NotificationproviderComponent,
    ProvideredithistoryComponent,
   // VitalEditpatientDemoDetailsComponent,
    //VitalsEditPatientEmergencyDetailsComponent
    
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    //MatDialogModule,
       AutocompleteLibModule,
       ScheduleModule,
    NgMultiSelectDropDownModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ProviderModule { }
