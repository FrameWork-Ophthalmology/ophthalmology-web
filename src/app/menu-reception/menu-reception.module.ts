import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuReceptionRoutingModule } from './menu-reception-routing.module';
import { MenuReceptionComponent } from './menu-reception.component';
import { AdmissionComponent } from './admission/admission.component';
import { I18nPipeForMenuReception } from '../Shared/i18n/i18nForMenuReception.pipe';


@NgModule({
  declarations: [
    MenuReceptionComponent,I18nPipeForMenuReception
    
  ],
  imports: [
    CommonModule,
    MenuReceptionRoutingModule
  ]
})
export class MenuReceptionModule { }
