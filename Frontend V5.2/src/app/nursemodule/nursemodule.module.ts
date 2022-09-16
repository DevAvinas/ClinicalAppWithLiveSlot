import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NursemoduleRoutingModule } from './nursemodule-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AbouthospitalComponent } from './components/abouthospital/abouthospital.component';
import { OldappointmentsComponent } from './components/oldappointments/oldappointments.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';

import { ProviderOldAppointmentsComponent } from './components/provider-old-appointments/provider-old-appointments.component';
import { ProviderOldVitaltableComponent } from './components/provider-old-vitaltable/provider-old-vitaltable.component';
import { RequestedAppointmentsComponent } from './components/requested-appointments/requested-appointments.component';
import { NurseDashboardComponent } from './components/nurse-dashboard/nurse-dashboard.component';

import { UpcomingconfirmedappointmentsComponent } from './components/upcomingconfirmedappointments/upcomingconfirmedappointments.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NursevitalmodelComponent } from './components/nursevitalmodel/nursevitalmodel.component';
import { ProBookDialogComponent } from './Dialog/booking-dialog/pro-book-dialog.component';
//import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CalendarComponent } from './components/calendar/calendar.component';
import { VitalEditpatientDemoDetailsComponent } from './components/vital-editpatient-demo-details/vital-editpatient-demo-details.component';
import { VitalsEditPatientEmergencyDetailsComponent } from './components/vitals-edit-patient-emergency-details/vitals-edit-patient-emergency-details.component';
import { NotificationproviderComponent } from './components/notificationprovider/notificationprovider.component';
import { ProvideredithistoryComponent } from './components/provideredithistory/provideredithistory.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NurseNavbarComponent } from './components/nurse-navbar/nurse-navbar.component';

// import { VitalmodalComponent} from 'src/app/nursemodule/components/vitalmodal/vitalmodal.component';


@NgModule({
  declarations: [
    AbouthospitalComponent,
 
   // MedicationDetailsComponent,
    OldappointmentsComponent,
    PatientVisitDetailsComponent,
    NotificationproviderComponent,
    ProvideredithistoryComponent,
   
   // ProviderAppointmentPagesComponent,
    
    ProviderOldAppointmentsComponent,
    ProviderOldVitaltableComponent,
    RequestedAppointmentsComponent,
    //VitalmodalComponent,
    NursevitalmodelComponent,
    NurseDashboardComponent,
    UpcomingconfirmedappointmentsComponent,
    //NursevitalmodelComponent,
    ProBookDialogComponent,
    CalendarComponent,
    VitalEditpatientDemoDetailsComponent,
    VitalsEditPatientEmergencyDetailsComponent,
    //NurseNavbarComponent,
   
  ],
  imports: [
    CommonModule,
    NursemoduleRoutingModule,
    FormsModule, ReactiveFormsModule,
    CommonModule,
    NursemoduleRoutingModule,
    AutocompleteLibModule,
    NgMultiSelectDropDownModule.forRoot(),
    TabsModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    ScheduleModule,
    NgbModule,
    //NursevitalmodelComponent,
   
    
  ]
})
export class NursemoduleModule { }
