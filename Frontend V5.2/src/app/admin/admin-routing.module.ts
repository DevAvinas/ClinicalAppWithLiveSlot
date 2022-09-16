import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { DataMgmtComponent } from './Components/data-mgmt/data-mgmt.component';
import { PatientMgmtComponent } from './Components/patient-mgmt/patient-mgmt.component';
import { ProviderMgmtComponent } from './Components/provider-mgmt/provider-mgmt.component';
import { ProviderRegistrationComponent } from './Components/provider-registration/provider-registration.component';

const routes: Routes = [
  { path: 'updatePatient', component: PatientMgmtComponent },
  { path: 'registerEmployee', component: ProviderRegistrationComponent},
  { path: 'updateEmployee', component: ProviderMgmtComponent},
  { path: 'admindashboard', component: AdminDashboardComponent },
  {path: 'updateData',component:DataMgmtComponent},
  {path:'',redirectTo:'/admin/admindashboard',pathMatch:'full'},
  {path:'**',redirectTo:'/admin/admindashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
