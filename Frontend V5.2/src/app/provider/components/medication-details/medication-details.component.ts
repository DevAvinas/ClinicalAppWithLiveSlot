import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ViewChild } from '@angular/core';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

import { ThisReceiver } from '@angular/compiler';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicationDetailsOutput } from 'src/app/provider/models/Medicationdetailsoutput';
import { MedicationDetails } from 'src/app/provider/models/MedicationDetails';
import { PatientVisitDetailsService } from 'src/app/provider/services/patient-visit-details.service';
import { MedicationDetailsService } from 'src/app/provider/services/medication-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-medication-details',
  templateUrl: './medication-details.component.html',
  styleUrls: ['./medication-details.component.css']
})
export class MedicationDetailsComponent implements OnInit {
  posts:MedicationDetails[];
  posts1:any;
  dropdownList:any;
  dropdownSettings:IDropdownSettings={};
  selectedItems:any;
  patient:MedicationDetails = new MedicationDetails();
  patients!:MedicationDetails[] ;
  patientout:MedicationDetailsOutput = new MedicationDetailsOutput();
  patientouts!:MedicationDetailsOutput[];
appointmentdetail:any;
  
  MedicationDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  flag:boolean=false;
  medicationdetails: MedicationDetailsOutput = new MedicationDetailsOutput ();
  medicationoutdetail: any;
  tempdescription!: any;

  saveDiagnosisDetails() {
    console.log(this.  MedicationDetailsForm.value);
    this.submitted = true;
    if (this.MedicationDetailsForm.invalid) {
      return;
    }
  }

  get f() {
    return this.MedicationDetailsForm.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private medicationdetailsservice: MedicationDetailsService, private fb: FormBuilder,private dialogRef: MatDialogRef<MedicationDetailsComponent>,private visitservice:PatientVisitDetailsService,private _snack:MatSnackBar) {
    this.formData();
  }
  ngOnInit(): void {
    this.getAllData();
    
    this.getAllData1();
   this.getData();
   

console.log("dataid"+this.data);
   this.dropdownSettings = {
    idField: 'id',
    textField: 'drug_brand_name',
  };
  }
  keyword = 'drug_name';
  
medicationDetail() {
    
    
    // this.router.navigate(['/', 'login'])
    this.submitted=true;
    if(this.MedicationDetailsForm.invalid) {
      return;
    }
   
    this.patientout.drug_id=this.MedicationDetailsForm.value.DrugiD
this.patientout.meetingid=this.data;
if(this.tempdescription){ this.patientout.drug_name=this.tempdescription;
console.log("drug"+this.patientout.drug_name+this.tempdescription);}
   
else this.patientout.drug_name=this.MedicationDetailsForm.value.Drugname.drug_name;
console.log("drug"+this.patientout.drug_name);
if(this.tempdescription)this.patientout.drug_brand_name=this.MedicationDetailsForm.value.DrugBrandName;
else{
console.log("drugbrandnamecheck"+this.MedicationDetailsForm.value.DrugBrandName);
let temp:string="";
this.patientout.drug_brand_name=[];
for(let i of this.MedicationDetailsForm.value.DrugBrandName){

 this.patientout.drug_brand_name.push(i.drug_brand_name);
 console.log("dummy"+ this.patientout.drug_brand_name);
 // temp=temp+i.drug_brand_name+",";
//  this.patientout.drug_brand_name.pus;
//this.patientout.drug_brand_name=this.MedicationDetailsForm.value.DrugBrandName;
}
console.log(temp.substring(0,temp.length));
//this.patientout.drug_brand_name=temp.substring(0,temp.length);
}
this.patientout.drug_generic_name=this.MedicationDetailsForm.value.Druggenericname;
this.patientout.drug_form=this.MedicationDetailsForm.value.DrugForm;

    //this.patients=this.MedicationDetailsForm.value;
    console.log("kp"+this.patients);
    let arr1: any[]=[];

    arr1.push(this.patientout);
    this.medicationdetailsservice.addUser(this.patientout).subscribe(obj => {
      this._snack.open("Data saved successfully" ,"Ok")
      duration: 3000
  
     //this.router.navigate(['/', 'login'])

  this.dialogRef.close("value submitted");
    
  });
    }

    getMedicationOutputdetail(id: any) {
      this.medicationdetailsservice.get(id)
        .subscribe(
          data => {
           this.medicationoutdetail = data;
            console.log("physician obj"+data);
          },
          error => {
            console.log(error);
          });
    }
getAllData(){
  this.medicationdetailsservice.getData().subscribe((res:any)=>{
   
    this.posts=res
    this.dropdownList= res;
    
    console.log("kkkk"+this.posts[1].drug_brand_name);
    this.flag=false;
   
  })
}

getData(){
  this.medicationdetailsservice.getDataoutput().subscribe((res1:any)=>{
   
    this.posts1=res1;
    
    console.log("kkkk"+this.posts1);

   
  })
}

getAllData1(){
  if(this.flag==false){
  this.getAllData();
  }
  else{
    this.selectEvent(event);
  }

}

  formData() {
    this.MedicationDetailsForm = this.fb.group({
      DrugiD: ['', [Validators.required, Validators.minLength(2)]],
      Drugname: ['', [Validators.required, Validators.minLength(2)]],
      Druggenericname: ['', [Validators.required, Validators.minLength(2)]],
      DrugBrandName: ['', [Validators.required]],
      
      DrugForm: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  fetchByDrugId() {
    this.tempdescription=undefined
    let dc: string = this.MedicationDetailsForm.get('DrugiD')?.value;
    if(dc === ""|| dc===null){
      this.MedicationDetailsForm.get('Druggenericname')?.setValue('');
      this.MedicationDetailsForm.get('DrugBrandName')?.setValue('');
      this.MedicationDetailsForm.get('Drugname')?.setValue('');
      this.MedicationDetailsForm.get('DrugForm')?.setValue('');
    }
    else {
      console.log("DrugiD: "+dc);
      this.medicationdetailsservice.fetchDatabyDrugid(dc).subscribe((data)  => {
        console.log("response------>"+data.Drug_Brand_Name);
        let arr: any[]=[];

        arr.push(data.drug_brand_name);
       
        this.MedicationDetailsForm.get('Drugname')?.setValue(Object.values(data)[1]);
        this.MedicationDetailsForm.get('Druggenericname')?.setValue(Object.values(data)[2]);
        //this.selectedItems.setValue(Object.values(data)[3]);
        this.MedicationDetailsForm.get('DrugBrandName')?.patchValue(arr);
        // this.MedicationDetailsForm.patchValue({DrugBrandName:data.Drug_Brand_Name});
        this.MedicationDetailsForm.get('DrugForm')?.setValue(Object.values(data)[4]);
        this.tempdescription=Object.values(data)[1];
      });
    }
  }
  namearray:any;
  fetchByMedicationName() {
    let dc: string = this.MedicationDetailsForm.get('Drugname')?.value;
    
    
    if(dc === ""|| dc===null){
      this.MedicationDetailsForm.get('')?.setValue('');
    }
    else
    
     {
      console.log("Drugname: "+dc);
     
      this.medicationdetailsservice.fetchData1(dc).subscribe(data => {
        console.log("response------>"+Object.values(data));
        for(dc of data){
          console.log(Object.values(dc));
          this.namearray=data;
        this.MedicationDetailsForm.get('Druggenericname')?.setValue(Object.values(dc)[2]);
      
        
        }
        
      });
    }
  }
  
  // selectEvent(item) {
  //   // do something with selected item
  // }
 
  // onChangeSearch(val: string) {
  //   // fetch remote data from here
  //   // And reassign the 'data' which is binded to 'data' property.
  // }
  
  // onFocused(e){
  //   // do something when input is focused
  // }

  @ViewChild('Drug_Name') auto:any;
 
  
  // onFocused(e:any) {
  //   e.stopPropagation();
  //   this.auto.focus(console.log(e));
  //  console.log(e);
  // }
  selectEvent(item:any) {
  
    // do something with selected item
    console.log(item);
    let dc:any=Object.values(item)[1];
    if( dc=== ""|| dc===null){
      this.MedicationDetailsForm.get('')?.setValue('');
    }
    else
    
     {
      console.log("Drugname: "+dc);
     
      this.medicationdetailsservice.fetchData1(dc).subscribe(data => {
        console.log("response1------>"+Object.values(data));
        for(let i=0; i<data.length; i++){
        
      //  for(dc of data){
          this.namearray=data;
          this.flag=true;
          this.dropdownList =data;
        //this.MedicationDetailsForm.get('Druggenericname')?.setValue(data[2].drug_generic_name);
        this.MedicationDetailsForm.get('DrugiD')?.setValue(data[i].drug_id);
        this.MedicationDetailsForm.get('Druggenericname')?.setValue(data[i].drug_generic_name);
       
       }
      });
    }


  }


 

}

