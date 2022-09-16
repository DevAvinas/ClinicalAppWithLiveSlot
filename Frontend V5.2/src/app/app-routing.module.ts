import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { GuestGuard } from './Auth/guest.guard';
//import { AppointmentBookingPatientComponent } from './Components-Pages/appointment-booking-patient/appointment-booking-patient.component';
import { ChangePasswordComponent } from './Components-Pages/change-password/change-password.component';
import { LoginComponent } from './Components-Pages/login/login.component';
import { PatientDetailsComponent } from './Components-Pages/patient-details/patient-details.component';
import { PatientEmergencyDetailsComponent } from './Components-Pages/patient-emergency-details/patient-emergency-details.component';
import { PatientMasterComponent } from './Components-Pages/patient-master/patient-master.component';
import { ProviderMasterComponent } from './Components-Pages/provider-master/provider-master.component';

import { HomepageComponent } from './Components-Pages/homepage/homepage.component';
import { PatientModuleGuard } from '../app/patient-module/patient-module.guard';
import { VitalmodalComponent } from './provider/components/vitalmodal/vitalmodal.component';
import { RequestedAppointmentsComponent } from './provider/components/requested-appointments/requested-appointments.component';
import { ProviderAppointmentPagesComponent } from './provider/components/provider-appointment-pagesold/provider-appointment-pages.component';
// import { PatientReportComponent } from './provider/components/patient-report/patient-report.component';
import { AdminGuard } from './Auth/admin.guard';
import { ProviderGuard } from './Auth/provider.guard';
//import { ProviderAppointmentPagesComponent } from './Components-Pages/provider-appointment-pages/provider-appointment-pages.component';
import { PatientReportComponent } from 'src/app/Components-Pages/patient-report/patient-report.component';
import { NurseGuard } from './Auth/nurse.guard';

//import { PatientVisitDetailsComponent } from './Components-Pages/patient-visit-details/patient-visit-details.component';

const routes: Routes = [
  { path: 'signup', canActivate:[GuestGuard], component: PatientMasterComponent},
  
  { path: 'emergencydetails', component: PatientEmergencyDetailsComponent },
 // { path: 'appointment',canActivate:[AuthGuard],component: AppointmentBookingPatientComponent },
  { path: 'forgot-pwd', canActivate:[AuthGuard],component: ChangePasswordComponent },
  { path: 'login', canActivate:[GuestGuard],component: LoginComponent },
  { path: 'patient-details', component: PatientDetailsComponent },
  //{ path: 'upcomingappointment', component: ProviderAppointmentPagesComponent },
  
  //{ path: 'requestedappointments:meetId', component:RequestedAppointmentsComponent },
 // { path: 'vitals', component: PatientVisitDetailsComponent},
  { path: 'admin',canActivate:[AdminGuard], loadChildren:()=>import('./admin/admin.module').then(mod=>mod.AdminModule)},
  { path: 'patient',canActivate:[PatientModuleGuard], loadChildren:()=>import('./patient-module/patient-module.module').then(mod=>mod.PatientModuleModule)},
  { path: 'provider',canActivate:[ProviderGuard], loadChildren:()=>import('./provider/provider.module').then(mod=>mod.ProviderModule)},
  { path: 'nurse',canActivate:[NurseGuard], loadChildren:()=>import('./nursemodule/nursemodule.module').then(mod=>mod.NursemoduleModule)},
  { path: 'report', component: PatientReportComponent },
  { path: 'report/:meetingid', component: PatientReportComponent },
  { path: 'homepage/', canActivate:[GuestGuard],  component:  HomepageComponent },
  
 {path:'',redirectTo:'homepage/',pathMatch:'full'},
  {path:'**',redirectTo:'homepage/',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
