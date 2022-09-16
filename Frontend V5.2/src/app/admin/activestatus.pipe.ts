import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activestatus'
})
export class ActivestatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value==true)return "Active";
    else return "Inactive";
  }

}
