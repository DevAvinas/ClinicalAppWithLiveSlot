import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
  
import jsPDF from 'jspdf';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from 'src/app/Services/report.service';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { PatientMaster } from 'src/app/Models/PatientMaster';
import { PatientDetails } from 'src/app/Models/PatientDetails';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { Appointment } from 'src/app/Models/Appointment';
import { PatientVisitDetails } from 'src/app/provider/models/PatientVisitDetails';
import html2canvas from 'html2canvas';
import { PatientMasterService } from 'src/app/Services/patient-master.service';

@Component({
  selector: 'app-patient-report',
  templateUrl: './patient-report.component.html',
  styleUrls: ['./patient-report.component.css']
})
export class PatientReportComponent implements OnInit {
  title = 'htmltopdf';
  
  @ViewChild('pdfTable') pdfTable: ElementRef;
  user: PatientMaster = new PatientMaster();
  patientDetails: PatientDetails = new PatientDetails();
  newAppt: Appointment = new Appointment();
  patientVitals:any = [];
  diagDescription: any=[];
  drug_brand_name: string='';
  drug_name: any;
  drug_form: any;
  procedureDescription: any;
  medication: any=[];
  procedure: any;
  patId:string;
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    // var html = htmlToPdfmake(pdfTable.innerHTML);
     
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open(); 
    // var html = htmlToPdfmake(pdfTable.innerHTML,
    //   );
      var html = htmlToPdfmake(pdfTable.innerHTML, {
        defaultStyles:{ // change the default styles

            'th': {bold:true, fillColor:'skyblue',},
            'td': {bold:false,preserveTrailingSpaces:true},

            'h2': {fontSize:20, bold:true, color:'#1a53ff',decoration:'underline',alignment:'center'},
            'h3': {fontSize:16, bold:true, color:'#00cc00',decoration:'underline'}

        }
      });
       
      var docDefinition = {
        content: [
          html
        ],
        styles:{
          '.box': {color:'red'},
        }
        
      };
      
      var pdfDocGenerator = pdfMake.createPdf(docDefinition).download();
  }

  public convertToPDF()
{
html2canvas(document.getElementById('pdfTable')).then(canvas => {
// Few necessary setting options
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jsPDF('p', 'mm',[canvas.width, canvas.height]); // A4 size page of PDF
var width = pdf.internal.pageSize.getWidth();
var height = canvas.height * width / canvas.width;
pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
var docname=this.patId;
pdf.save(docname); // Generated PDF
});
}
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private reportService:ReportService,
    private dashboardService: DashboardService,
    private apptserv: AppointmentService,
    private patientService:PatientMasterService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('meetingid');
    this.apptserv.getApptByMeetingId(id)
    .subscribe(data=>{
      console.log(data);

      this.newAppt=data;
      this.patId=this.newAppt.patientId+"-"+this.newAppt.apptDt;
      this.apptserv.getbypatientid(this.newAppt.patientId).subscribe((data1: any) => {
        console.log(data1);
        this.user = data1
        this.patientDetails=data1.patientDemographicDetails;

      });
    });
    this.reportService.getVitalByMeetingId(parseInt(id))
    .subscribe(data=>{
      console.log(data);
      this.patientVitals.push(data[data.length-1]);
    });
    this.reportService.getConsultationDataByMeetingId(parseInt(id))
    .subscribe(data=>{
      console.log(data);

      console.log(data.prescribedDiagnosis);
      this.diagDescription=data.prescribedDiagnosis;
      console.log(this.diagDescription);
      console.log(data.prescribedMedication);

      data.prescribedMedication.forEach((element:any)=>{
          
        element.drug_brand_name=element.drug_brand_name.toString()
        this.medication.push(element)
      })
      // let temp:any=[];
      this.procedure = data.prescribedProcedure;

      // console.log(this.diagDescription);
      //this.drug_brand_name=data.drug_brand_name;
      // console.log(data.prescribedMedication.drug_brand_name);
      //   console.log(temp.length)
      // for (let index = 0; index < temp.length; index++) {
        
      //   this.drug_brand_name=this.drug_brand_name+temp[index];

      //   if(index!=temp.length-1){
      //     this.drug_brand_name=this.drug_brand_name+", ";
      //   }
      //   // console.log(tmp)
      // }
      this.drug_name=data.prescribedMedication.drug_name;
      this.drug_form=data.prescribedMedication.drug_form;
      this.procedureDescription=data.prescribedProcedure.procedureDescription;
    });
 
    this.populateModel();
  }
  populateModel() {

   // this.apptserv.getApptByMeetingId
    //

  
  }

}
