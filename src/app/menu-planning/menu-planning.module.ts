import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPlanningRoutingModule } from './menu-planning-routing.module';
import { MenuPlanningComponent } from './menu-planning.component';
import { PlanningComponent } from './planning/planning.component';
import { I18nPipeForMenuPlanning } from '../Shared/i18n/i18nForMenuPlanning.pipe';


@NgModule({
  declarations: [
    MenuPlanningComponent,I18nPipeForMenuPlanning
    
  ],
  imports: [
    CommonModule,
    MenuPlanningRoutingModule
  ]
})
export class MenuPlanningModule { }
