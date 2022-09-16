import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdressService } from 'src/app/Services/adress.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { PostalcodeService } from 'src/app/Services/postalcode.service';
import { Address } from 'src/app/Models/Address';
import { PatientDetails } from 'src/app/Models/PatientDetails';
import { PatientMaster } from 'src/app/Models/PatientMaster';

@Component({
  selector: 'app-vital-editpatient-demo-details',
  templateUrl: './vital-editpatient-demo-details.component.html',
  styleUrls: ['./vital-editpatient-demo-details.component.css']
})
export class VitalEditpatientDemoDetailsComponent implements OnInit {
  patientDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  patientDetails: PatientDetails = new PatientDetails();
  user: PatientMaster = new PatientMaster();
  address:Address=new Address();
  addresscarrier:any;
  patientId:any;
  @Input() meetingID:any;
  apptObj: any;
  constructor(private addressService:AdressService,private postalcodeService: PostalcodeService,private patientService: PatientMasterService, private fb: FormBuilder, private dashboardService: DashboardService
    ,private appt:AppointmentService) {
      this.formData();
      

  }

  ngOnInit(): void {
    console.log("Input"+this.meetingID)

    // this.patientService.findByPatientId('PT005')
    // .subscribe(data=>{
    //   console.log(data);
    // })

    
    this.patientService.findByPatientId(this.meetingID).subscribe((data:PatientMaster)=>{
      this.user=data;
      sessionStorage.setItem('Patientdata', JSON.stringify(this.user));
      console.log(sessionStorage.getItem('Patientdata'));
      this.patientDetailsForm.get('firstName')?.setValue(JSON.parse(sessionStorage.getItem('Patientdata') || '{}').firstname);
      this.patientDetailsForm.get('lastName')?.setValue(JSON.parse(sessionStorage.getItem('Patientdata') || '{}').lastname);
      this.patientDetailsForm.get('email')?.setValue(JSON.parse(sessionStorage.getItem('Patientdata') || '{}').email);
      this.patientDetailsForm.get('dob')?.setValue(JSON.parse(sessionStorage.getItem('Patientdata') || '{}').dob);
      this.calAge();
      this.address=JSON.parse(sessionStorage.getItem('Patientdata') || '{}').address[0];
      this.patientDetails=JSON.parse(sessionStorage.getItem('Patientdata') || '{}').patientDemographicDetails;
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
      // this.patientDetailsForm.get('firstName')?.patchValue(this.user.firstname);   
      // console.log(this.patientDetailsForm.get('lastName')?.setValue(this.user.lastname));
      // this.patientDetailsForm.get('email')?.setValue(this.user.email);
      // this.patientDetailsForm.get('dob')?.setValue(this.user.dob);
      //  this.calAge();
      this.patientId=this.user.patient_id;
      console.log(this.patientId);
      // this.address=this.user.address[0];
      // this.patientDetails=this.user.['patientDemographicDetails];
      this.patientDetails.patientRegistrationDetails = this.user;
    });
    console.log('hi');


    // this.dashboardService.getPatient(this.user.email).subscribe((data: PatientMaster) => this.user = data);
    console.log(this.patientDetails)
    console.log(this.address);
    console.log(this.patientDetails);
    this.patientDetailsForm.get('address')?.get('line1')?.setValue(this.address.line1);
    this.patientDetailsForm.get('address')?.get('line2')?.setValue(this.address.line2);
    this.patientDetailsForm.get('address')?.get('city')?.setValue(this.address.city);
    this.patientDetailsForm.get('address')?.get('country')?.setValue(this.address.country);
    this.patientDetailsForm.get('address')?.get('state')?.setValue(this.address.state);
    this.patientDetailsForm.get('address')?.get('postalcode')?.setValue(this.address.postalcode);
   
    // this.address.patientRegistrationDetails=this.user;
    this.patientDetailsForm.get('dialcode')?.setValue(this.patientDetails.dialcode);
    this.patientDetailsForm.get('contact')?.setValue(this.patientDetails.contact);
    this.patientDetailsForm.get('ethnicity')?.setValue(this.patientDetails.ethnicity);
    this.patientDetailsForm.get('language')?.setValue(this.patientDetails.language);
    //this.patientDetails.patientRegistrationDetails = this.user;


    // this.patientDetails.patientRegistrationDetails = this.user;    



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
    console.log(this.patientDetailsForm.value);
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

      alert("Saved Successfully!")

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
