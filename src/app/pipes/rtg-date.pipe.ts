import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'year'
})
export class YearPipe extends DatePipe implements Pipe {
  name: string;

  transform(date: number, args?: any): any {
    const shortDate = super.transform(date, 'short');
    const dateArr = (shortDate).match(/(\d+)\/(\d+)\/(\d+)?/);
    return dateArr && dateArr.length > 3 ? dateArr[3] : '';
  }
}
