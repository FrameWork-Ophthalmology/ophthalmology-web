import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ParametrageComponent } from './parametrage.component'; 
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { I18nPipeForMenu } from '../Shared/i18n/i18nForMenu.pipe';
 
import { TabViewModule } from 'primeng/tabview'; // Import TabViewModule 
import { CliniqueComponent } from './clinique/clinique.component';
import { OperationComponent } from './operation/operation.component';
import { TypeOperationComponent } from './type-operation/type-operation.component';
import { ListboxModule } from 'primeng/listbox';
@NgModule({
  declarations: [
    ParametrageComponent,I18nPipeForMenu, 
    // CliniqueComponent,
    // OperationComponent,
    // TypeOperationComponent,
  ],
  imports: [
    CommonModule,TagModule,MatIconModule,MatMenuModule,TabViewModule,
    ParametrageRoutingModule
  ]
})
export class ParametrageModule { }
