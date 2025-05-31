import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { I18nPipeForMenuReception } from '../Shared/i18n/i18nForMenuReception.pipe';
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'; 
import { I18nPipeForMenuReception2 } from '../Shared/i18n/i18nForMenuReception2.pipe';

@NgModule({
  declarations: [
    ReceptionComponent,I18nPipeForMenuReception2
  ],
  imports: [
    CommonModule,TagModule,MatIconModule,MatMenuModule,
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
