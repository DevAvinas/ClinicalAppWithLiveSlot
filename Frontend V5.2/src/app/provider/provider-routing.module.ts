import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from '../Components-Pages/patient-details/patient-details.component';
import { PatientEmergencyDetailsComponent } from '../Components-Pages/patient-emergency-details/patient-emergency-details.component';
import { AbouthospitalComponent } from './components/abouthospital/abouthospital.component';

import { MedicationDetailsComponent } from './components/medication-details/medication-details.component';
import { OldappointmentsComponent } from './components/oldappointments/oldappointments.component';
import { PatientVisitDetailsComponent } from './components/patient-visit-details/patient-visit-details.component';
import { ProcedureMasterComponent } from './components/Procedure-master/procedure-master.component';
import { ProviderAppointmentPagesComponent } from './components/provider-appointment-pages/provider-appointment-pages.component';
import { ProviderDashboardComponent } from './components/provider-dashboard/provider-dashboard.component';
import { ProviderOldAppointmentsComponent } from './components/provider-old-appointments/provider-old-appointments.component';
import { ProviderOldVitaltableComponent } from './components/provider-old-vitaltable/provider-old-vitaltable.component';
import { RequestedAppointmentsComponent } from './components/requested-appointments/requested-appointments.component';

import { NurseDashboardComponent } from './components/nurse-dashboard/nurse-dashboard.component';
import { VitalmodalComponent } from './components/vitalmodal/vitalmodal.component';
import { DiagnosisMasterComponent } from 'src/app/provider/components/diagnosis-master/diagnosis-master.component';
import { UpcomingconfirmedappointmentsComponent } from './components/upcomingconfirmedappointments/upcomingconfirmedappointments.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NotificationproviderComponent } from './components/notificationprovider/notificationprovider.component';
import { ProvideredithistoryComponent } from './components/provideredithistory/provideredithistory.component';



const routes: Routes = [

 

  { path: 'emergencydetails', component: PatientEmergencyDetailsComponent },
  { path: 'patient-details', component: PatientDetailsComponent },

  { path: 'oldappointment', component: OldappointmentsComponent },
  { path: 'upcomingappointment', component: ProviderAppointmentPagesComponent },
  { path: 'Medication', component: MedicationDetailsComponent},
  //{ path: 'visitpage:meeting_id', component:VitalmodalComponent},
  { path: 'vitals', component: PatientVisitDetailsComponent},
  { path: 'providerdashboard', component:ProviderDashboardComponent},
  { path: 'provideroldappointment', component:ProviderOldAppointmentsComponent },
 
  { path: 'procedure', component:ProcedureMasterComponent },
  { path: 'diagnosis', component:DiagnosisMasterComponent },
  { path: 'abouthospital', component:AbouthospitalComponent },
  { path: 'oldvitaltable/:meetId', component: ProviderOldVitaltableComponent},
  { path: 'requestedappointments', component:RequestedAppointmentsComponent },
  { path: 'upcomingappointment', component: ProviderAppointmentPagesComponent },
  { path: 'nursedashboard', component:NurseDashboardComponent },
  { path: 'scheduler', component:CalendarComponent },
  { path: 'notification', component:NotificationproviderComponent },
  { path: 'edithistory', component:ProvideredithistoryComponent },
  { path: 'confirmedupcomingappointments', component:UpcomingconfirmedappointmentsComponent },
  { path: 'visitpagepro/:meeting_id', component:VitalmodalComponent},
   {path:'',redirectTo:'/provider/providerdashboard',pathMatch:'full'},
   {path:'**',redirectTo:'/provider/providerdashboard',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviderRoutingModule { }
