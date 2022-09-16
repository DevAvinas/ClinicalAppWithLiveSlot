import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ResetDialogComponent } from './Dialogs/reset-dialog/reset-dialog.component';
import { LockDialogComponent } from './Dialogs/lock-dialog/lock-dialog.component';
import { ProviderMgmtComponent } from './Components/provider-mgmt/provider-mgmt.component';
import { PatientMgmtComponent } from './Components/patient-mgmt/patient-mgmt.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ProviderRegistrationComponent } from './Components/provider-registration/provider-registration.component';
import { ActivestatusPipe } from './activestatus.pipe';
import { DataMgmtComponent } from './Components/data-mgmt/data-mgmt.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DiagnosisMasterComponent } from './Dialogs/diagnosis-master/diagnosis-master.component';
import { MedicationDialogComponent } from './Dialogs/medication-dialog/medication-dialog.component';
import { ProcedureDialogComponent } from './Dialogs/procedure-dialog/procedure-dialog.component';


//  import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';


@NgModule({
  declarations: [
    ResetDialogComponent,LockDialogComponent,
    ProviderMgmtComponent,PatientMgmtComponent,AdminDashboardComponent,ProviderRegistrationComponent,ActivestatusPipe, DataMgmtComponent,
    DiagnosisMasterComponent,
    MedicationDialogComponent,
    ProcedureDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule, ReactiveFormsModule,MatButtonModule,MatIconModule, 
    MatToolbarModule,MatTableModule,MatPaginatorModule,MatCardModule,
    RouterModule,MatFormFieldModule,MatSortModule,HttpClientModule,MatInputModule,MatDialogModule,MatMenuModule,MatTabsModule,
  ]
})
export class AdminModule { }
