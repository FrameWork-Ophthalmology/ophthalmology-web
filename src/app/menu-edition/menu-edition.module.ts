import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuEditionRoutingModule } from './menu-edition-routing.module';
import { MenuEditionComponent } from './menu-edition.component';
import { EditionComponent } from './edition/edition.component';
import { I18nPipeForMenuEdition } from '../Shared/i18n/i18nForMenuEditon.pipe';


@NgModule({
  declarations: [
    MenuEditionComponent,I18nPipeForMenuEdition
    
  ],
  imports: [
    CommonModule,
    MenuEditionRoutingModule
  ]
})
export class MenuEditionModule { }
