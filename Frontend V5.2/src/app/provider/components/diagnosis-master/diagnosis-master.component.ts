import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DiagnosisMaster } from 'src/app/provider/models/DiagnosisMaster (1)';
import { PrescDiagnosis } from 'src/app/provider/models/PrescDiagnosis';
import { DiagnosisMasterService } from 'src/app/provider/services/diagnosis-master.service (1)';


@Component({
  selector: 'app-diagnosis-master',
  templateUrl: './diagnosis-master.component.html',
  styleUrls: ['./diagnosis-master.component.css']
})
export class DiagnosisMasterComponent implements OnInit {

  diagnosisDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  dignosisMaster: PrescDiagnosis = new PrescDiagnosis();
  form: any;
  diagnosis!:DiagnosisMaster[];
  tempdescription!: any;

  saveDiagnosisDetails() {
    
    console.log("data---->"+this.diagnosisDetailsForm.value);
    this.submitted = true;
    if (this.diagnosisDetailsForm.invalid) {
      return;
    }
    this.dignosisMaster.diagnosisCode=this.diagnosisDetailsForm.value.diagnosisCode;
    if(this.tempdescription) this.dignosisMaster.diagnosisDescription=this.tempdescription;

   
    else this.dignosisMaster.diagnosisDescription=this.diagnosisDetailsForm.value.diagnosisDescription.diagnosisDescription;
  
    this.dignosisMaster.diagnosisIsDepricated=this.diagnosisDetailsForm.value.diagnosisIsDepricated;
    this.dignosisMaster.meeting_id=this.data;
    console.log("diagnosisid"+this.dignosisMaster.meeting_id);
    this.diagnosisMasterService.adddDiagnosis(this.dignosisMaster).subscribe(obj => {
      console.log(obj);
      this._snack.open("Data has been submiited successfully!" ,"Ok")
      duration: 3000
  
   
      this.dialogRef.close("value submitted");
   });
  }

  get f() {
    return this.diagnosisDetailsForm.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<DiagnosisMasterComponent>,private diagnosisMasterService: DiagnosisMasterService, private fb: FormBuilder,private _snack:MatSnackBar) {
    this.formData();
  }
  // //displayedColumns = ['id', 'Diagnosis_Description','Diagnosis_Is_Depricated'];
  // dataSource: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  
  ngOnInit(): void {
    this.getDiagnosisData(this.data);
    this.getAllData();
   }
   keyword = 'diagnosisDescription';
   posts:any;
   dropdownList:any;
   namearray:any;
   flag:any;
 getAllData(){
   this.diagnosisMasterService.getData().subscribe((res:any)=>{
     this.posts=res;
    // this.dataSource= new MatTableDataSource(res);
     console.log("value is -->"+this.posts);
   })
 }
 

 getDiagnosisData(id:any){
  console.log(id)
  this.diagnosisMasterService.findDiagnosisByMeeingId(id).subscribe((res:any)=>{
    this.posts=res;
   // this.dataSource= new MatTableDataSource(res);
    console.log("value is -->"+this.posts);
  })
}

  formData() {
   
    this.diagnosisDetailsForm = this.fb.group({
      diagnosisCode: ['', [Validators.required, Validators.minLength(2)]],
    //  description: ['', [Validators.required, Validators.minLength(2)]],
      //  logintype: new FormControl('Facebook'),
      diagnosisIsDepricated: ['', [Validators.required]],
      diagnosisDescription: new FormControl(''),
      customDescription: new FormControl('')
    })
    this.setEventListeners();
  }
  setEventListeners() {
    this.diagnosisDetailsForm?.get('diagnosisDescription').valueChanges.subscribe(val => {
      if (val != 'other') {
        this.diagnosisDetailsForm.get('customDescription').setValue('')
      }
    })
  }
  fetchLocation() {
    this.tempdescription=undefined
    let dc: string = this.diagnosisDetailsForm.get('diagnosisCode')?.value;
    if(dc === ""|| dc===null){
      this.diagnosisDetailsForm.get('diagnosisDescription')?.setValue('');
    }
    else {
      console.log("dignosiscode Code: "+dc);
      this.diagnosisMasterService.fetchData(dc).subscribe(data => {
        console.log("response------>"+data);
        this.diagnosisDetailsForm.get('diagnosisDescription')?.setValue(Object.values(data)[1]);
        this.tempdescription=Object.values(data)[1];
      });
    }
  }

  fetchByDignosis() {
    let dc: string = this.diagnosisDetailsForm.get('diagnosisDescription')?.value;
    if(dc === ""|| dc===null){
      this.diagnosisDetailsForm.get('diagnosisCode')?.setValue('');
    }
    else {
      console.log("description value: "+dc);
      this.diagnosisMasterService.fetchData1(dc).subscribe(data => {
        console.log("response------>"+Object.values(data)[0]);
        for(dc of data){
          console.log(Object.values(dc)[0]);
        this.diagnosisDetailsForm.get('diagnosisCode')?.setValue(Object.values(dc)[1]);
        }
       
      });
    }
  }
  @ViewChild('Diagnosis_Description') auto:any;
 
  
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
      this.diagnosisDetailsForm.get('')?.setValue('');
    }
    else
    
     {
      console.log("Drugname: "+dc);
     
      this.diagnosisMasterService.fetchData1(dc).subscribe(data => {
        console.log("response------>"+Object.values(data));
        // for(dc of data){
        //   console.log(Object.values(dc));
        //   this.namearray=data;
        //   this.flag=true;
        //   this.dropdownList =data;
        this.diagnosisDetailsForm.get('diagnosisCode')?.setValue(Object.values(data)[0]);
      //  }
       
      });
    }
  }

}