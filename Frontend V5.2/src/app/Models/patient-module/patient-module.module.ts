import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientModuleRoutingModule } from './patient-module-routing.module';
import { PatientDashboardComponent } from './Components-Pages/patient-dashboard/patient-dashboard.component';
import { PatientUpcomingAppointmentsComponent } from './Components-Pages/patient-upcoming-appointments/patient-upcoming-appointments.component';
import { PatientSchedulingDashboardComponent } from './Components-Pages/patient-scheduling-dashboard/patient-scheduling-dashboard.component';
import { BookDataCollectionAppointmentComponent } from './Components-Pages/book-data-collection-appointment/book-data-collection-appointment.component';
import { PatientNotificationsPageComponent } from './Components-Pages/patient-notifications-page/patient-notifications-page.component';
import { PatientVisitHistoryComponent } from './Components-Pages/patient-visit-history/patient-visit-history.component';
import { AppointmentBookingPatientComponent } from 'src/app/Components-Pages/appointment-booking-patient/appointment-booking-patient.component';

import { EditDataCollectionAppointmentComponent } from './Components-Pages/edit-data-collection-appointment/edit-data-collection-appointment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewUserWelcomePageComponent } from './Components-Pages/new-user-welcome-page/new-user-welcome-page.component';
import { PatientReportComponent } from './Components-Pages/patient-report/patient-report.component';
import { EditPatientDetailsComponent } from './Components-Pages/edit-patient-details/edit-patient-details.component';
import { EditPatientEmergencyDetailsComponent } from './Components-Pages/edit-patient-emergency-details/edit-patient-emergency-details.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { EditHistoryModalComponent } from './Components-Pages/edit-history-modal/edit-history-modal.component';
import { ChangePasswordComponent } from './Components-Pages/change-password/change-password.component';

@NgModule({
  declarations: [
    PatientDashboardComponent,
    PatientUpcomingAppointmentsComponent,
    PatientSchedulingDashboardComponent,
    BookDataCollectionAppointmentComponent,
    PatientNotificationsPageComponent,
    PatientVisitHistoryComponent,
    EditDataCollectionAppointmentComponent,
    NewUserWelcomePageComponent,
    PatientReportComponent,
    EditPatientDetailsComponent,
    EditPatientEmergencyDetailsComponent,
    EditHistoryModalComponent,
    AppointmentBookingPatientComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    PatientModuleRoutingModule,
    TabsModule.forRoot(),
    AutocompleteLibModule,

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule
  ]
})
export class PatientModuleModule { }
