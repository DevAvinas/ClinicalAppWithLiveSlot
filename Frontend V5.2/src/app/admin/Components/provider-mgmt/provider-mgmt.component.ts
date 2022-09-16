import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LockDialogComponent } from '../../Dialogs/lock-dialog/lock-dialog.component';
import { ResetDialogComponent } from '../../Dialogs/reset-dialog/reset-dialog.component';
import { AdminService } from '../../Service/admin.service';

@Component({
  selector: 'app-provider-mgmt',
  templateUrl: './provider-mgmt.component.html',
  styleUrls: ['./provider-mgmt.component.css']
})
export class ProviderMgmtComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstname','role', 'dor', 'status', 'lock','reset'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serv: AdminService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  getAllProviders() {
    this.serv.getProviders().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  getColor(status: any) {
    if(status) return '#00FF00';
    else return 'grey';
    }


  lockUnlockPatient(row: any) {
    this.dialog.open(LockDialogComponent, { width: '30%', data: row }).afterClosed().subscribe(resp => this.getAllProviders());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  
  

  resetUser(row: any){
    this.dialog.open(ResetDialogComponent, { width: '30%', data: row }).afterClosed().subscribe(resp => this.getAllProviders());
  }


}
