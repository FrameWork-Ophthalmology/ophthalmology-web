import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPlanningComponent } from './menu-planning.component';
import { PlanningComponent } from './planning/planning.component';
import { I18nService } from '../Shared/i18n/i18n.service';

const routes: Routes = [
  { path: '', component: MenuPlanningComponent }
, {
    path: 'planning',
    component: PlanningComponent,
    data: { title: 'PlanningOperation', icon: 'fas fa-calendar-days' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPlanningRoutingModule {

   constructor(private i18nService: I18nService) {
        this.translateRouteTitles();
      }
      translateRouteTitles() {
        routes.forEach(route => {
          if (route.data && route.data['title']) {
            route.data['title'] = this.i18nService.getString(route.data['title']);
          }
        });
      }



 }
