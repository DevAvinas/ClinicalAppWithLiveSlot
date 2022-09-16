import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components-Pages/navbar/navbar.component';
import { FooterComponent } from './Components-Pages/footer/footer.component';
import { LoginComponent } from './Components-Pages/login/login.component';

import { PatientMasterComponent } from './Components-Pages/patient-master/patient-master.component';


//import { PatientVisitDetailsComponent } from './Components-Pages/patient-visit-details/patient-visit-details.component';
import { PatientDetailsComponent } from './Components-Pages/patient-details/patient-details.component'
import { PatientEmergencyDetailsComponent } from './Components-Pages/patient-emergency-details/patient-emergency-details.component';

import { HttpClientModule } from '@angular/common/http';
import { ProviderMasterComponent } from './Components-Pages/provider-master/provider-master.component';
import { ChangePasswordComponent } from './Components-Pages/change-password/change-password.component';
import { AppointmentBookingPatientComponent } from './Components-Pages/appointment-booking-patient/appointment-booking-patient.component';
import { AuthService } from './Auth/auth.service';
import { SidebarComponent } from './Components-Pages/sidebar/sidebar.component';
import { HomepageComponent } from './Components-Pages/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTable } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminNavbarComponent } from './admin/Components/admin-navbar/admin-navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
// import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { VitalmodalComponent } from './provider/components/vitalmodal/vitalmodal.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { ProviderAppointmentPagesComponent } from './provider/components/provider-appointment-pagesold/provider-appointment-pages.component';
import { MedicationDetailsComponent } from './provider/components/medication-details/medication-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProNavbarComponent } from './provider/components/pro-navbar/pro-navbar.component';
import { GuestnavbarComponent } from './Components-Pages/guestnavbar/guestnavbar.component';
// import { PatientReportComponent } from './provider/components/patient-report/patient-report.component';
import { VitalEditpatientDemoDetailsComponent } from './provider/components/vital-editpatient-demo-details/vital-editpatient-demo-details.component';
import { VitalsEditPatientEmergencyDetailsComponent } from './provider/components/vitals-edit-patient-emergency-details/vitals-edit-patient-emergency-details.component';
import { ResetPasswordComponent } from './Components-Pages/reset-password/reset-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NurseNavbarComponent } from './nursemodule/components/nurse-navbar/nurse-navbar.component';
// import { PatientReportComponent } from './Components-Pages/patient-report/patient-report.component';

import { PatientReportComponent } from 'src/app/Components-Pages/patient-report/patient-report.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PatientMasterComponent,
   VitalmodalComponent,
    PatientDetailsComponent,
    ProviderMasterComponent,
    LoginComponent,
    PatientEmergencyDetailsComponent,
    // ProviderAppointmentPagesComponent,
    ChangePasswordComponent,
    SidebarComponent,
    HomepageComponent,
    AdminNavbarComponent,
     MedicationDetailsComponent,
     ProNavbarComponent,
     PatientReportComponent,
     GuestnavbarComponent,
     ResetPasswordComponent,
      VitalEditpatientDemoDetailsComponent,
     VitalsEditPatientEmergencyDetailsComponent,
     NurseNavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    TabsModule.forRoot(),
    AutocompleteLibModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSnackBarModule,
    NgbModule,
     NgMultiSelectDropDownModule.forRoot(),
   // TabsModule.forRoot(),

  ],
  providers: [AuthService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
