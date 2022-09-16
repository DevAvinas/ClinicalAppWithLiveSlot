import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/Models/Address';
import { PatientDetails } from 'src/app/Models/PatientDetails';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { PostalcodeService } from 'src/app/Services/postalcode.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  patientDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  patientDetails!: PatientDetails ;
  patientMaster!:PatientMaster;
addresscarrier:any;


  savePatientDetails() {
    console.log(this.patientDetailsForm.value);
    this.submitted = true;
    if (this.patientDetailsForm.invalid) {
      return;
    }
    this.addresscarrier=this.f['address'].value;
    console.log(this.f['address'].value);
    console.log(this.patientDetailsForm.get('address')?.value);
    this.populateModel();
    this.patientService.savePatientDetails(this.patientDetails).subscribe(data =>{
      alert("Saved Successfully!");

    });
  }

  populateModel(){
    // this.patientDetails.firstName = this.patientDetailsForm.get('firstName')?.value;
    // this.patientDetails.lastName = this.patientDetailsForm.get('lastName')?.value;
    // this.patientDetails.email = this.patientDetailsForm.get('email')?.value;
    this.patientDetails.dob = this.patientDetailsForm.get('dob')?.value;
   // this.patientDetails.address = this.patientDetailsForm.get('address')?.value;
    this.patientDetails.dialcode=this.patientDetailsForm.get('dialcode')?.value;
    this.patientDetails.contact = this.patientDetailsForm.get('contact')?.value;
    this.patientDetails.ethnicity = this.patientDetailsForm.get('ethnicity')?.value;
    this.patientDetails.language = this.patientDetailsForm.get('language')?.value;
    console.log(this.patientDetails);
  }

  get f() {
    return this.patientDetailsForm.controls;
  }

  


  constructor(private postalcodeService: PostalcodeService,private patientService: PatientMasterService, private fb: FormBuilder) {
    this.formData();
  }

  ngOnInit(): void {
    this.patientDetailsForm.get('firstName')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').firstname);
    this.patientDetailsForm.get('lastName')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').lastname);
    this.patientDetailsForm.get('email')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').email);
    //this.patientDetailsForm.get('email')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').email);
    this.patientDetailsForm.get('email')?.setValue("avi@gmail.com");
    this.patientDetailsForm.get('dob')?.setValue(JSON.parse(sessionStorage.getItem('User') || '{}').dob);
    this.calAge();

  }

  formData() {
    this.patientDetailsForm = this.fb.group({

      firstName: ['Raghu', [Validators.required, Validators.minLength(2)]],
      lastName: ['Ram', [Validators.required, Validators.minLength(2)]],
      email: ['Ram@gmail.com', [Validators.required, Validators.email]],
      dob: ['2012-09-11', [Validators.required]],
      age: ['24'],
      contact: ['9876789876', [Validators.required, Validators.minLength(7), Validators.pattern("[0-9]+")]],
      ethnicity: ['Indian', [Validators.required]],
      language: ['Hindi', [Validators.required]],
      address: new FormGroup({
        line1: new FormControl('Indiranagar'),
        line2: new FormControl('Colony'),
        postalcode: new FormControl('600008'),
        city: new FormControl('Chennai'),
        state: new FormControl('Tamilnadu'),
        country: new FormControl('India')
      }),
      dialcode: ['+91']
    })
 
    console.log(this.patientDetailsForm.get('address')?.value)
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
  //   if(pc === ""|| pc===null){
  //     this.patientDetailsForm.get('address')?.get('city')?.setValue('');
  //       this.patientDetailsForm.get('address')?.get('state')?.setValue('');
  //       this.patientDetailsForm.get('address')?.get('country')?.setValue('');
  //       this.patientDetailsForm.get('dialcode')?.setValue('');
  //   }
  //   else {
  //     console.log("Postal Code: "+pc);
  //     this.patientService.fetchLocation(pc).subscribe(data => {
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
}
