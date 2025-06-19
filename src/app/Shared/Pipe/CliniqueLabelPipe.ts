import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'GetLabel'
})
export class CliniqueLabelPipe implements PipeTransform {
  transform(value: string, list: { value: string; label: string; }[]): string {
    const item = list.find(item => item.value === value);
    return item ? item.label : ''; // Return empty string if not found
  }
}