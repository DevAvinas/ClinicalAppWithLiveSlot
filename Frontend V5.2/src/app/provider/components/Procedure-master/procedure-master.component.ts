import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProcedureMaster } from 'src/app/provider/models/ProcedureMaster (1)';
import { ProcedureMasterService } from 'src/app/provider/services/procedure-master.service (1)';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrescProcedure } from 'src/app/provider/models/PrescProcedure';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-procedure-master',
  templateUrl: './procedure-master.component.html',
  styleUrls: ['./procedure-master.component.css']
})
export class ProcedureMasterComponent implements OnInit {

  
  procedureDetailsForm!: FormGroup;
  submitted = false;
  isDisabled = false;
  procedureMaster: PrescProcedure = new PrescProcedure();
  tempdescription!: any;

  saveProcedureDetails() {
    console.log("data---->"+this.procedureDetailsForm.value);
    this.submitted = true;
    if (this.procedureDetailsForm.invalid) {
      return;
    }
    this.procedureMaster.procedureCode=this.procedureDetailsForm.value.procedureCode;
    if(this.tempdescription) this.procedureMaster.procedureDescription=this.tempdescription;

   
    else this.procedureMaster.procedureDescription=this.procedureDetailsForm.value.procedureDescription.procedureDescription;
  
    this.procedureMaster.procedureIsDepricated=this.procedureDetailsForm.value.procedureIsDepricated;
    this.procedureMaster.meeting_id=this.data;
    console.log(this.procedureMaster);
    this.procedureMasterServ.adddProcedure(this.procedureMaster).subscribe(obj => {
      console.log(obj);
      this._snack.open("Data has been submiited successfully!" ,"Ok")
      duration: 3000
  

      this.dialogRef.close("value submitted");
   });
  }
 

  get f() {
    return this.procedureDetailsForm.controls;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ProcedureMasterComponent>,private procedureMasterServ: ProcedureMasterService, private fb: FormBuilder,private _snack:MatSnackBar) {
    this.formData();
  }
  // displayedColumns = ['id', 'Procedure_Description','Procedure_Is_Depricated'];
  // dataSource: MatTableDataSource<any>;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllData();
   }
   keyword = 'procedureDescription';
   posts:any;
   dropdownList:any;
   namearray:any;
   flag:any;
 getAllData(){
   this.procedureMasterServ.getData().subscribe((res:any)=>{
    this.posts=res;
    //this.dataSource= new MatTableDataSource(res);
     console.log("value is -->"+this.posts);
   })
 }
  

  formData() {
    this.procedureDetailsForm = this.fb.group({
      procedureCode: ['', [Validators.required, Validators.minLength(2)]],
     // description: ['', [Validators.required, Validators.minLength(2)]],
     procedureIsDepricated: ['', [Validators.required]],
     procedureDescription: new FormControl(''),
      customDescription: new FormControl('')
    })
    this.setEventListeners();
  }
  setEventListeners() {
    this.procedureDetailsForm?.get('procedureDescription').valueChanges.subscribe(val => {
      if (val != 'other') {
        this.procedureDetailsForm.get('customDescription').setValue('')
      }
    })
  }

  fetchLocation() {
    this.tempdescription=undefined
    let dc: string = this.procedureDetailsForm.get('procedureCode')?.value;
    if(dc === ""|| dc===null){
      this.procedureDetailsForm.get('procedureDescription')?.setValue('');
    }
    else {
      console.log("procedurecode Code: "+dc);
      this.procedureMasterServ.fetchData(dc).subscribe(data => {
        console.log("response------>"+data);
        this.procedureDetailsForm.get('procedureDescription')?.setValue(Object.values(data)[1]);
        this.tempdescription=Object.values(data)[1];
      });
    }
  }

  fetchByDignosis() {
    let dc: string = this.procedureDetailsForm.get('procedureDescription')?.value;
    if(dc === ""|| dc===null){
      this.procedureDetailsForm.get('procedureCode')?.setValue('');
    }
    else {
      console.log("description value: "+dc);
      this.procedureMasterServ.fetchData1(dc).subscribe(data => {
        console.log("response------>"+Object.values(data)[0]);
        for(dc of data){
          console.log(Object.values(dc)[0]);
        this.procedureDetailsForm.get('procedureCode')?.setValue(Object.values(dc)[1]);
        }
       
      });
    }
  }
  @ViewChild('procedureDescription') auto:any;
 
  
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
      this.procedureDetailsForm.get('')?.setValue('');
    }
    else
    
     {
      console.log("Drugname: "+dc);
     
      this.procedureMasterServ.fetchData1(dc).subscribe(data => {
        console.log("response------>"+Object.values(data));
        // for(dc in data){
        //   console.log(Object.values(data)[0]);
          // this.namearray=data;
          // this.flag=true;
          // this.dropdownList =data;
        this.procedureDetailsForm.get('procedureCode')?.setValue(Object.values(data)[0]);
       // }
       
      });
    }
  }

}


