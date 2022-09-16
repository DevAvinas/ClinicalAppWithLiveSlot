import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './Components-Pages/patient-dashboard/patient-dashboard.component';
import { PatientUpcomingAppointmentsComponent } from './Components-Pages/patient-upcoming-appointments/patient-upcoming-appointments.component';
import { PatientSchedulingDashboardComponent } from './Components-Pages/patient-scheduling-dashboard/patient-scheduling-dashboard.component';
import { BookDataCollectionAppointmentComponent } from './Components-Pages/book-data-collection-appointment/book-data-collection-appointment.component';
import { PatientNotificationsPageComponent } from './Components-Pages/patient-notifications-page/patient-notifications-page.component';
import { PatientVisitHistoryComponent } from './Components-Pages/patient-visit-history/patient-visit-history.component';
import { PatientModuleGuard } from '../patient-module/patient-module.guard';
import { EditPatientDetailsComponent } from './Components-Pages/edit-patient-details/edit-patient-details.component';
import { AppointmentBookingPatientComponent } from 'src/app/Components-Pages/appointment-booking-patient/appointment-booking-patient.component';

import { EditDataCollectionAppointmentComponent } from './Components-Pages/edit-data-collection-appointment/edit-data-collection-appointment.component';
import { ChangePasswordComponent } from './Components-Pages/change-password/change-password.component';

const routes: Routes = [
  // { path: 'signup', canActivate:[GuestGuard], component: PatientMasterComponent},
  // { path: 'psignup', component: ProviderMasterComponent },
  // { path: 'emergencydetails', component: PatientEmergencyDetailsComponent },
  // { path: 'appointment',component: AppointmentBookingPatientComponent },
  // { path: 'forgot-pwd', canActivate:[AuthGuard],component: ChangePasswordComponent },
  // { path: 'login', canActivate:[GuestGuard],component: LoginComponent },
  // { path: 'patient-details', component: PatientDetailsComponent },
  // { path: 'home',component:DashboardComponent},
  // { path: 'homepage', component:  HomepageComponent },
   { path: 'appointment',component: AppointmentBookingPatientComponent },

  { path: 'patient-dashboard', component: PatientDashboardComponent },
  { path: 'upcoming-appointments', component: PatientUpcomingAppointmentsComponent },
  { path: 'patient-scheduling', component: PatientSchedulingDashboardComponent },
  { path: 'notifications', component:   PatientNotificationsPageComponent},
  { path: 'patient-visit-history', component:   PatientVisitHistoryComponent},
  { path: 'edit', component:   EditDataCollectionAppointmentComponent},
  // { path: 'report', component:   PatientReportComponent},
  { path: 'demographic', component: EditPatientDetailsComponent },
  { path: 'updatepassword', component: ChangePasswordComponent },
  {path:'',redirectTo:'/patient/patient-dashboard',pathMatch:'full'},
   {path:'**',redirectTo:'/patient/patient-dashboard',pathMatch:'full'},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientModuleRoutingModule { }
