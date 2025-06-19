import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuDMIRoutingModule } from './menu-dmi-routing.module';
import { MenuDMIComponent } from './menu-dmi.component';
import { MatMenuModule } from '@angular/material/menu';
import { I18nPipeForDmi } from '../Shared/i18n/i18nForDmi.pipe';


@NgModule({
  declarations: [
    MenuDMIComponent,I18nPipeForDmi
  ],
  imports: [
    CommonModule,
    MenuDMIRoutingModule,MatMenuModule
  ]
})
export class MenuDMIModule { }
