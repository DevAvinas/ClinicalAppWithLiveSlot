import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/Services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarservice:SidebarService) { }
  status: boolean = true;

  ngOnInit(): void {

    this.sidebarservice.sidebarflag.subscribe((value) => {
      this.status = value;
    });
  }

}
