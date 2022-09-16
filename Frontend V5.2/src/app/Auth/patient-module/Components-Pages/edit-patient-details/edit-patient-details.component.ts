import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from 'src/app/Models/Address';
import { PatientDetails } from 'src/app/Models/PatientDetails';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { AdressService } from 'src/app/Services/adress.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { PostalcodeService } from 'src/app/Services/postalcode.service';
@Component({
  selector: 'app-edit-patient-details',
  templateUrl: './edit-patient-details.component.html',
  styleUrls: ['./edit-patient-details.component.css']
})
export class EditPatientDetailsComponent implements OnInit {
  patientDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  patientDetails: PatientDetails = new PatientDetails();
  user: PatientMaster = new PatientMaster();
  address:Address=new Address();
  addresscarrier:any;
  patientId:any;
  constructor(private _snack:MatSnackBar,private addressService:AdressService,private postalcodeService: PostalcodeService,private patientService: PatientMasterService, private fb: FormBuilder, private dashboardService: DashboardService) {
    this.formData();
  }

  ngOnInit(): void {
    this.dashboardService.getPatient(JSON.parse(sessionStorage.getItem('User') || '{}').email).subscribe((data: PatientMaster) => {this.user = data;console.log(this.user)});
    this.patientDetailsForm.get('firstName')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').firstname);
    this.patientDetailsForm.get('lastName')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').lastname);
    this.patientDetailsForm.get('email')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').email);
    this.patientDetailsForm.get('dob')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').dob);
    this.calAge();
    this.patientId=JSON.parse(sessionStorage.getItem('User') || '{}').patient_id;
    console.log(this.patientId);
    this.address=JSON.parse(sessionStorage.getItem('User') || '{}').address[0];
    this.patientDetails=JSON.parse(sessionStorage.getItem('User') || '{}').patientDemographicDetails;
    this.patientDetails.patientRegistrationDetails = this.user;

    console.log(this.address);
    console.log(this.patientDetails);
    this.patientDetailsForm.get('address')?.get('line1')?.setValue(this.address.line1);
    this.patientDetailsForm.get('address')?.get('line2')?.setValue(this.address.line2);
    this.patientDetailsForm.get('address')?.get('city')?.setValue(this.address.city);
    this.patientDetailsForm.get('address')?.get('country')?.setValue(this.address.country);
    this.patientDetailsForm.get('address')?.get('state')?.setValue(this.address.state);
    this.patientDetailsForm.get('address')?.get('postalcode')?.setValue(this.address.postalcode);
   
    this.address.patientRegistrationDetails=this.user;
    this.patientDetailsForm.get('dialcode')?.setValue(this.patientDetails.dialcode);
    this.patientDetailsForm.get('contact')?.setValue(this.patientDetails.contact);
    this.patientDetailsForm.get('ethnicity')?.setValue(this.patientDetails.ethnicity);
    this.patientDetailsForm.get('language')?.setValue(this.patientDetails.language);
    this.patientDetails.patientRegistrationDetails = this.user;
  }

  formData() {
    this.patientDetailsForm = this.fb.group({

      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      age: [''],
      contact: ['', [Validators.required, Validators.minLength(7), Validators.pattern("[0-9]+")]],
      ethnicity: ['', [Validators.required]],
      language: ['', [Validators.required]],
      address: new FormGroup({
        line1: new FormControl(''),
        line2: new FormControl(''),
        postalcode: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        country: new FormControl(''),
        address_type:new FormControl('self')
      }),
      dialcode: [''],
      allergyExists: ['']
    })
  }


  savePatientDetails() {
    // console.log(this.patientDetailsForm.value);
    this.submitted = true;
    if (this.patientDetailsForm.invalid) {
      return;
    }
    this.populateModel();
    this.addresscarrier=this.f['address'].value;
    console.log(this.addresscarrier);
    console.log(this.patientDetails);

    this.patientService.savePatientDetails(this.patientDetails).subscribe(data =>{
      console.log(data);

      //alert("Saved Successfully!")
    });
    console.log(this.address)
    this.addressService.saveAddress(this.address).subscribe(data1=>{
      console.log(data1);
      this.addresscarrier=this.f['address'].value;

      // alert("Saved Successfully!")
      this._snack.open(("Updated Successfully!"),"Ok",{
        duration: 3000
      });

})
  }
  // line1: new FormControl(''),
  // line2: new FormControl(''),
  // postalcode: new FormControl(''),
  // city: new FormControl(''),
  // state: new FormControl(''),
  // country: new FormControl(''),
  // address_trype:new FormControl('self')
  populateModel() {
    // this.patientDetails.firstName = this.patientDetailsForm.get('firstName')?.value;
    // this.patientDetails.lastName = this.patientDetailsForm.get('lastName')?.value;
    // this.patientDetails.email = this.patientDetailsForm.get('email')?.value;
    console.log("DOB: " + this.patientDetailsForm.get('dob')?.value);
    console.log("Age: " + this.patientDetailsForm.get('age')?.value);
    this.patientDetails.dob = this.patientDetailsForm.get('dob')?.value;
    this.patientDetails.age = this.patientDetailsForm.get('age')?.value;
    // this.patientDetails.address = this.patientDetailsForm.get('address')?.value;
    this.address.line1=this.patientDetailsForm.get('address')?.get('line1')?.value
    this.address.line2=this.patientDetailsForm.get('address')?.get('line2')?.value
    this.address.city=this.patientDetailsForm.get('address')?.get('city')?.value
    this.address.country=this.patientDetailsForm.get('address')?.get('country')?.value
    this.address.state=this.patientDetailsForm.get('address')?.get('state')?.value
    this.address.postalcode=this.patientDetailsForm.get('address')?.get('postalcode')?.value
    this.address.address_type='self';
    this.address.patientRegistrationDetails=this.user;
    this.patientDetails.dialcode = this.patientDetailsForm.get('dialcode')?.value;
    this.patientDetails.contact = this.patientDetailsForm.get('contact')?.value;
    this.patientDetails.ethnicity = this.patientDetailsForm.get('ethnicity')?.value;
    this.patientDetails.language = this.patientDetailsForm.get('language')?.value;
    this.patientDetails.patientRegistrationDetails = this.user;
    if (this.user.title === "Mr") this.patientDetails.gender = "Male";
    else this.patientDetails.gender = "Female";
    console.log(this.patientDetails);
  }

  get f() {
    return this.patientDetailsForm.controls;
  }


  

  calAge() {
    let birthDate = new Date(this.patientDetailsForm.get('dob')?.value);
    console.log(this.patientDetailsForm.get('dob')?.value);
    let today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    this.patientDetailsForm.controls['age'].setValue(calculatedAge);
  }

  // fetchLocation() {
  //   let pc: string = this.patientDetailsForm.get('address')?.get('postalcode')?.value;
  //   if (pc === "" || pc === null) {
  //     this.patientDetailsForm.get('address')?.get('city')?.setValue('');
  //     this.patientDetailsForm.get('address')?.get('state')?.setValue('');
  //     this.patientDetailsForm.get('address')?.get('country')?.setValue('');
  //     this.patientDetailsForm.get('dialcode')?.setValue('');
  //   }
  //   else {
  //     console.log("Postal Code: " + pc);
  //     this.patientService.fetchLocation(pc).subscribe((data: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  //       this.patientDetailsForm.get('address')?.get('city')?.setValue(Object.values(data)[1]);
  //       this.patientDetailsForm.get('address')?.get('state')?.setValue(Object.values(data)[2]);
  //       this.patientDetailsForm.get('address')?.get('country')?.setValue(Object.values(data)[3]);
  //       this.patientDetailsForm.get('dialcode')?.setValue(Object.values(data)[4]);
  //     });
  //   }
  // }
  fetchLocation() {
    let pc: string = this.patientDetailsForm.get('address')?.get('postalcode')?.value;
    if(pc === ""|| pc===null){
      this.patientDetailsForm.get('address')?.get('city')?.setValue('');
        this.patientDetailsForm.get('address')?.get('state')?.setValue('');
        this.patientDetailsForm.get('address')?.get('country')?.setValue('');
        this.patientDetailsForm.get('dialcode')?.setValue('');
    }
    else {
      console.log("Postal Code: "+pc);
      this.postalcodeService.fetchDataGeoNamesAPI(pc).subscribe(data => {
        console.log(data['postalCodes'][0]['adminName3']);
        this.patientDetailsForm.get('address')?.get('city')?.setValue(data['postalCodes'][0]['adminName2']);
        this.patientDetailsForm.get('address')?.get('state')?.setValue(data['postalCodes'][0]['adminName1']);
        
        this.postalcodeService.fetchDataCountryCodeJSON().subscribe(codes=>{

          let tempData=[];
              tempData.push(codes);
              for (let index = 0; index < codes.length; index++) {
                console.log(codes[index].dial_code);

                if(codes[index].code==data['postalCodes'][0]['countryCode']){
               this.patientDetailsForm.get('address')?.get('country')?.setValue(codes[index].name);
               this.patientDetailsForm.get('dialcode')?.setValue(codes[index].dial_code);

                }
                
              }

          //console.log(response);
        })

      });
    }
  }

  enableAlgy(){

  }

  disableAlgy(){

  }

}
