import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrageRoutingModule } from './parametrage-routing.module';
import { ParametrageComponent } from './parametrage.component'; 
import { TagModule } from 'primeng/tag';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { I18nPipeForMenu } from '../Shared/i18n/i18nForMenu.pipe';
 
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabViewModule } from 'primeng/tabview'; // Import TabViewModule  
import { MatTabsModule } from '@angular/material/tabs'; 
import { TabContentComponentParam } from './TabContentComponentMaint';
import { MenuParamContentComponent } from './menu-maintenance-content.component';
@NgModule({
  declarations: [
    ParametrageComponent,I18nPipeForMenu, TabContentComponentParam,MenuParamContentComponent
   
  ],
  imports: [
    CommonModule,TagModule,MatIconModule,MatMenuModule,TabViewModule,MatTabsModule,
    TabsModule,
    ParametrageRoutingModule
  ]
})
export class ParametrageModule { }
