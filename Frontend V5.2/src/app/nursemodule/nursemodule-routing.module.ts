import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NurseDashboardComponent } from 'src/app/nursemodule/components/nurse-dashboard/nurse-dashboard.component';
import { UpcomingconfirmedappointmentsComponent } from 'src/app/nursemodule/components/upcomingconfirmedappointments/upcomingconfirmedappointments.component';
import { ProviderAppointmentPagesComponent } from 'src/app/nursemodule/components/provider-appointment-pages/provider-appointment-pages.component';
import { ProviderOldAppointmentsComponent } from 'src/app/nursemodule/components/provider-old-appointments/provider-old-appointments.component';
import { RequestedAppointmentsComponent } from 'src/app/nursemodule/components/requested-appointments/requested-appointments.component';
import { NursevitalmodelComponent } from './components/nursevitalmodel/nursevitalmodel.component';
import { ProviderOldVitaltableComponent } from './components/provider-old-vitaltable/provider-old-vitaltable.component';
import { CalendarComponent } from 'src/app/nursemodule/components/calendar/calendar.component';
import { NotificationproviderComponent } from './components/notificationprovider/notificationprovider.component';
import { ProvideredithistoryComponent } from './components/provideredithistory/provideredithistory.component';


const routes: Routes = [
{ path: 'nursedashboard', component:NurseDashboardComponent},
{ path: 'requestedappointments', component:RequestedAppointmentsComponent },
  { path: 'upcomingappointment', component: ProviderAppointmentPagesComponent },
{ path: 'confirmedupcomingappointments', component:UpcomingconfirmedappointmentsComponent},
{ path: 'provideroldappointment', component:ProviderOldAppointmentsComponent },
{ path: 'visitpagepro/:meeting_id', component:NursevitalmodelComponent},
{ path: 'provideroldappointment', component:ProviderOldAppointmentsComponent },
{ path: 'oldvitaltable', component: ProviderOldVitaltableComponent},
{ path: 'scheduler', component:CalendarComponent },
{ path: 'notification', component:NotificationproviderComponent },
{ path: 'edithistory', component:ProvideredithistoryComponent },

{path:'',redirectTo:'/nurse/nursedashboard',pathMatch:'full'},
{path:'**',redirectTo:'/nurse/nursedashboard',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NursemoduleRoutingModule { }
