import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18nForMenuPlanning'
})
 

export class I18nPipeForMenuPlanning implements PipeTransform {
  constructor(private i18nService: I18nService) { }
  transform(value: any, ...args: any[]): any {
    if (value) {
      return this.i18nService.getString(value);
    }
    return value;
  }

}