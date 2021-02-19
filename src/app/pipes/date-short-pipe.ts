import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'DateShortPipe'
})
export class DateShortPipe extends
    DatePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return super.transform(value, "yyyy-MM-dd");
    }
}