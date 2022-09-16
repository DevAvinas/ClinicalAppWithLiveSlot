import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebar = new BehaviorSubject<any>({});
  sidebarflag = this.sidebar.asObservable();
  private addressData = new BehaviorSubject<any>({});
  addressDataCollector = this.sidebar.asObservable();

  constructor() {}

  setSidebarStatus(product: any) {
    this.sidebar.next(product);
  }
}
