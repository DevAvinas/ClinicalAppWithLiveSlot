import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientEmergencyDetails } from 'src/app/Models/PatientEmergencyDetails';
import { EmergencyDetailsService } from 'src/app/Services/emergency-details.service';
import { PatientMasterService } from 'src/app/Services/patient-master.service';
import { PostalcodeService } from 'src/app/Services/postalcode.service';

@Component({
  selector: 'app-patient-emergency-details',
  templateUrl: './patient-emergency-details.component.html',
  styleUrls: ['./patient-emergency-details.component.css']
})
export class PatientEmergencyDetailsComponent implements OnInit {

  constructor(private postalcodeService: PostalcodeService,private patientService: PatientMasterService,private formBuilder:FormBuilder,private emergencyDetailsService:EmergencyDetailsService) { }
  form!:FormGroup;
  submitted=false;
   list: string[] = [];
   @Input() addressparent:any;
  // users:User[]=[];
  user:PatientEmergencyDetails = new PatientEmergencyDetails();
  sameAsabove(e:any){
    //console.log(this.f['sameaddressflag'].value);
    //this.form.patchValue({this.addressparent});
    console.log(this.addressparent?.line1);
    
      // line1: this.addressparent?.line1,
      // line2:this.addressparent?.line1,
      // postalcode: this.addressparent?.line1,
      // city: this.addressparent?.line1,
      // state: this.addressparent?.line1,
      // country: this.addressparent?.line1  
      this.form.get('address')?.get('line1')?.setValue( this.addressparent?.line1);
      this.form.get('address')?.get('line2')?.setValue( this.addressparent?.line2);
      this.form.get('address')?.get('postalcode')?.setValue( this.addressparent?.postalcode);
      this.form.get('address')?.get('city')?.setValue( this.addressparent?.city);
      this.form.get('address')?.get('state')?.setValue( this.addressparent?.state);
      this.form.get('address')?.get('country')?.setValue( this.addressparent?.country);
      this.postalcodeService.fetchDataCountryCodeJSON().subscribe(codes=>{

        let tempData=[];
            tempData.push(codes);
            for (let index = 0; index < codes.length; index++) {
              console.log(codes[index].dial_code);
  
              if(codes[index].name==this.addressparent?.country){
             this.form.get('address')?.get('country')?.setValue(codes[index].name);
             this.form.get('country_code')?.setValue(codes[index].dial_code);
  
              }
              
            }
  
        //console.log(response);
      })
  }
  addUser() {
    this.submitted=true;
    this.form.patchValue({
      line1: new FormControl(''),
      line2: new FormControl(''),
      postalcode: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl('')    });


    //this.form.=this.f['country_code'].value+this.f['phone'].value;
      // console.log(this.form['phone'].getValue())
      // console.log(this.form.controls.phone
      //   .setValue(this.f['country_code'].value+this.f['phone'].value));
        
      this.form.patchValue({
        phone:this.f['country_code'].value+this.f['phone'].value
      });
          console.log(this.f['phone'].value)
          this.form.removeControl('country_code');
        this.user=this.form.value;
    if(this.form.invalid) {
      return;
    }
    else{
      this.emergencyDetailsService.saveEmergencyDetils(this.user).subscribe(
        dta=>{
          alert("data saved");

        }
      );
      let arr: any[]=[];
      arr.push();
    }
    console.log(this.form.value)
  //  this.userService.addUser(this.form.value).subscribe(obj => {
  //    this.users.push(obj);
  //    alert('user added')
  //    this.form.reset();
  //  });
  }

  //getter to call the controls of your form
  get f() {
    return this.form.controls;
  }
//   description ?:string;
//   phy_id ?:number;
//   dateofappointment?:string;
//   timeofappontment?:string;
// reason?:string
  formData() {
    this.form = this.formBuilder.group
    //this.form = new FormGroup
    ({
      first_name: new FormControl('Sonam',[Validators.required,Validators.minLength(2)]),
      last_name: new FormControl('Singh',[Validators.required,Validators.minLength(2)]),
      relationship: new FormControl('Mother',[Validators.required]),
      email: new FormControl('Sonam@gmail.com',[Validators.required,Validators.email]),
      country_code: new FormControl('+91',[Validators.required]),
      phone: new FormControl('9876789876',[Validators.required,Validators.minLength(10)]),
      // address: new FormControl('',[Validators.required,Validators.pattern(''),Validators.minLength(10)]),
      sameaddressflag:new FormControl(''),
      address: new FormGroup({
        line1: new FormControl('Indiranagar'),
        line2: new FormControl('Colony'),
        postalcode: new FormControl('600008'),
        city: new FormControl('Chennai'),
        state: new FormControl('Tamil Nadu'),
        country: new FormControl('India')
      }),
      access_flag: new FormControl('false',[Validators.required]),    
    }
    // ,{validators:[Validation.match('password','confirmpassword')]}
    )
  }
  fetchLocation() {
    let pc: string = this.form.get('address')?.get('postalcode')?.value;
    if(pc === ""|| pc===null){
      this.form.get('address')?.get('city')?.setValue('');
        this.form.get('address')?.get('state')?.setValue('');
        this.form.get('address')?.get('country')?.setValue('');
        this.form.get('dialcode')?.setValue('');
    }
    else {
      console.log("Postal Code: "+pc);
      this.postalcodeService.fetchDataGeoNamesAPI(pc).subscribe(data => {
        console.log(data['postalCodes'][0]['adminName3']);
        this.form.get('address')?.get('city')?.setValue(data['postalCodes'][0]['adminName2']);
        this.form.get('address')?.get('state')?.setValue(data['postalCodes'][0]['adminName1']);
        this.patchCountryCode(data['postalCodes'][0]['countryCode']);


      });
    }
  }
  patchCountryCode(postalC:string){
    this.postalcodeService.fetchDataCountryCodeJSON().subscribe(codes=>{

      let tempData=[];
          tempData.push(codes);
          for (let index = 0; index < codes.length; index++) {
            console.log(codes[index].dial_code);

            if(codes[index].code==postalC){
           this.form.get('address')?.get('country')?.setValue(codes[index].name);
           this.form.get('country_code')?.setValue(codes[index].dial_code);

            }
            
          }

      //console.log(response);
    })
  }
  ngOnInit(): void {
    this.formData();
    console.log(this.f['phone'].value)
    this.postalcodeService.fetchDataGeoNamesAPI("828109").subscribe(data=>{
      console.log(data);
    })
    //this.sameAsabove(e.);
  }

}
